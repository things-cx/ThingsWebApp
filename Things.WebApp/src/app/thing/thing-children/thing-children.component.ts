import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Things, ThingsController } from 'api-typings/bundle';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdSnackBar } from '@angular/material';
import { NoContentUnderneathDialogComponent } from '../no-content-underneath-dialog/no-content-underneath-dialog.component';

@Component({
  selector: 'app-thing-children',
  templateUrl: './thing-children.component.html',
  styleUrls: ['./thing-children.component.scss']
})
export class ThingChildrenComponent implements OnInit, OnChanges {

  // TODO: should this be a seperate call when first entering thing details
  // (info can be fetched in one call and then afterwards only children if needed)

  @Input() id: number;
  @Input() logedInUserId: number;
  @Input() parentHierarchy: string[][];
  things: Things.Api.ViewModels.Thing.ThingChildrenViewModel[];
  skip = 0;
  isProcessing = true;
  showChildMoveHandle = false;

  constructor(private thingsController: ThingsController,
    public dialog: MdDialog,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.loadChildren();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if ((propName === 'id' || propName === 'logedInUserId') &&
        !changes[propName].firstChange &&
        changes[propName].currentValue !== changes[propName].previousValue) {

        this.skip = 0;
        this.things = [];

        this.loadChildren();
      }
    }
  }

  loadChildren() {
    this.getThingChildren();

    if (!('ontouchstart' in window) &&
      ((this.id === this.logedInUserId && this.parentHierarchy === null) ||
        (this.parentHierarchy !== null && +this.parentHierarchy[0][0] === this.logedInUserId))) {
      // Touch events are not supported
      this.showChildMoveHandle = true;
    }
  }

  getThingChildren() {
    this.isProcessing = true;
    // TODO: impliment preloading (spinner) while content is loading. This is actually applicable to all http requests!
    // TODO: not sure if this shouldn't also be in the ngOnInit or is ngOnChanges fine?
    const viewModel = new Things.Api.ViewModels.Thing.GetThingChildrenViewModel;
    viewModel.skip = this.skip;

    this.thingsController.readThingChildren(this.id, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = data;
    });
  }

  loadMore() {
    this.isProcessing = true;

    this.skip += 10;
    const viewModel = new Things.Api.ViewModels.Thing.GetThingChildrenViewModel;
    viewModel.skip = this.skip;

    this.thingsController.readThingChildren(this.id, viewModel).subscribe(data => {
      this.isProcessing = false;
      this.things = this.things.concat(data);
    });
  }

  follow(thingChildrenModel: Things.Api.ViewModels.Thing.ThingChildrenViewModel, event: Event) {
    event.stopPropagation();
    // this.isProcessingFollow = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingFollowerViewModel;
    viewModel.followThingId = thingChildrenModel.thing.id;
    this.thingsController.createThingFollower(viewModel).subscribe(() => {
      thingChildrenModel.followed = true;
      // this.isProcessingFollow = false;
    });
  }

  unfollow(thingChildrenModel: Things.Api.ViewModels.Thing.ThingChildrenViewModel, event: Event) {
    event.stopPropagation();
    // this.isProcessingFollow = true;

    const viewModel = new Things.Api.ViewModels.Thing.ThingFollowerViewModel;
    viewModel.followThingId = thingChildrenModel.thing.id;
    this.thingsController.deleteThingFollower(viewModel).subscribe(() => {
      thingChildrenModel.followed = false;
      // this.isProcessingFollow = false;
    });
  }

  openNoContentDialog() {
    this.dialog.open(NoContentUnderneathDialogComponent);
  }

  // TODO: drag feature should actually be in a directive
  onDragStart(event: DragEvent, data: Things.Api.ViewModels.Thing.ThingChildrenViewModel) {
    event.dataTransfer.setData('draggedThingId', data.thing.id.toString());
  }
  onDrop(event: DragEvent, data: Things.Api.ViewModels.Thing.ThingChildrenViewModel) {
    const draggedThingId = +event.dataTransfer.getData('draggedThingId');

    if (draggedThingId !== data.thing.id) {

      const droppedThingIndex = this.things.findIndex(x => x.thing.id === data.thing.id);
      if (droppedThingIndex + 1 !== this.things.length) {
        const draggedThingIndex = this.things.findIndex(x => x.thing.id === draggedThingId);

        const movedThing = this.things.splice(draggedThingIndex, 1)[0];
        this.things.splice(droppedThingIndex, 0, movedThing);

        event.preventDefault();

        this.dragBorder(event.target, 'none');

        // TODO: add permission to this call
        this.thingsController.moveThing(draggedThingId, data.thing.id).subscribe(() => {
          this.snackBar.open('Move successful', '', {
            duration: 1000,
          });
        }, error => {
          this.snackBar.open('Error moving', '', {
            duration: 1000,
          });
        });
      }
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragBorder(event.target, 'none');
  }
  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.dragBorder(event.target, 'solid 1px red');
  }

  dragBorder(targetElement: EventTarget, borderStyle: string) {
    (<HTMLDivElement>targetElement).style.borderTop = borderStyle;
  }
}
