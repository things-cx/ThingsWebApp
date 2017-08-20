import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

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

  addButton() {
    this.buttonType = null;
    this.isAddingButton = false;
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
