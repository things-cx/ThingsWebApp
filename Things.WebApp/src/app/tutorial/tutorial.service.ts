import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TutorialService {

  tutorials: Tutorial[] = [
    {
      version: 1,
      type: TutorialArea.createThing
    },
    {
      version: 1,
      type: TutorialArea.createPublicThing
    },
    {
      version: 1,
      type: TutorialArea.editThingTags
    },
    {
      version: 1,
      type: TutorialArea.editThingDescription
    },
    {
      version: 1,
      type: TutorialArea.editThingMedia
    },
    {
      version: 1,
      type: TutorialArea.thingDetails
    },
    {
      version: 1,
      type: TutorialArea.firstTimeUser
    },
    {
      version: 1,
      type: TutorialArea.createPost
    },
    {
      version: 1,
      type: TutorialArea.editAmazon
    },
    {
      version: 1,
      type: TutorialArea.createShortcutThing
    }
  ];

  constructor(private http: Http) { }

  hasDoneTutorial(area: TutorialArea): boolean {
    const filteredTutorials = this.tutorials.filter(x => x.type === area);
    if (filteredTutorials[0] !== null) {
      const localTutorial = localStorage.getItem(`tutorial_${area}_${filteredTutorials[0].version}`);
      if (localTutorial === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      console.error('tutorial area does not exist!');
    }
  }

  setTutorialAsDone(area: TutorialArea) {
    const currentVersion = this.tutorials.filter(x => x.type === area)[0].version;
    localStorage.setItem(`tutorial_${area}_${currentVersion}`, 'true');
  }
}

export enum TutorialArea {
  createThing = 1,
  createPublicThing = 2,
  editThingTags = 3,
  editThingDescription = 4,
  editThingMedia = 5,
  thingDetails = 6,
  firstTimeUser = 7,
  createPost = 8,
  editAmazon = 9,
  createShortcutThing = 10
}

export class Tutorial {
  version: number;
  type: TutorialArea;
}

