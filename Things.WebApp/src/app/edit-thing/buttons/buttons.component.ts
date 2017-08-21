import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThingsController, Things } from "api-typings/bundle";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  thingId: number;
  isProcessing = false;
  isAddingButton: boolean;
  buttonType: ButtonType;
  buttonTypeEnum = ButtonType;
  linkButtonTitles = [
    'Contact Us',
    'Website'
  ];

  constructor(private route: ActivatedRoute,
    private thingsController: ThingsController) { }

  ngOnInit() {
    // if (!this.tutorial.hasDoneTutorial(TutorialArea.editAmazon)) {
    //   this.router.navigate(['/tutorial', TutorialArea.editAmazon]);
    // }

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.thingId = +params.get('id');
      }
    });
  }

  addLinkButton() {
    const viewModel = new Things.Api.Models.Button.ButtonModel;
    const button = new Things.Api.Models.Button.LinkButtonModel;
    button.linkTitleType = null;
    button.linkUrl = '';
    viewModel.linkButtonModel = button;

    this.addButton(viewModel);
  }

  addAppButton() {
    const viewModel = new Things.Api.Models.Button.ButtonModel;
    const button = new Things.Api.Models.Button.AppButtonModel;
    button.appId = '';
    viewModel.appButtonModel = button;

    this.addButton(viewModel);
  }

  addButton(viewModel: Things.Api.Models.Button.ButtonModel) {
    this.isProcessing = true;

    this.thingsController.editThingButtons(this.thingId, viewModel).subscribe(data => {
      this.buttonType = null;
      this.isAddingButton = false;
      this.isProcessing = false;
    });
  }
}

enum ButtonType {
  link = 1,
  app = 2,
  download = 3,
  amazon = 4,
  donate = 5,
  addToCart = 6,
  buy = 7,
  viewJob = 8,
  HireMe = 9
}
