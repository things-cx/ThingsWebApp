import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Things } from 'api-typings/bundle';
// import { RequestResult } from "./RequestResult";

@Injectable()
export class PublicThingService {
    private publicThingStorageKey = 'public-things';

    constructor(private router: Router) { }

    addToken(id, token) {
        const model = new Things.Api.ViewModels.Thing.PublicThingToken;
        model.id = id;
        model.authToken = token;

        const publicThings = this.getPublicThings();
        // Remove duplicates
        for (let i = 0; i < publicThings.length; i++) {
            if (publicThings[i].id === id) {
                publicThings.splice(i, 1);
            }
        }
        publicThings.push(model);

        this.setPublicThings(publicThings);
    }

    getPublicThings(): Things.Api.ViewModels.Thing.PublicThingToken[] {
        return JSON.parse(sessionStorage.getItem(this.publicThingStorageKey)) || [];
    }

    setPublicThings(value: Things.Api.ViewModels.Thing.PublicThingToken[]) {
        // TODO: There is a limit on session storage. It should be checked
        sessionStorage.setItem(this.publicThingStorageKey, JSON.stringify(value));
    }

    hasPublicThingToken(id: number): boolean {
        for (const item of this.getPublicThings()) {
            if (item.id === id) {
                return true;
            }
        }
        return false;
    }

    getPublicThingValue(id: number): string {
        for (const item of this.getPublicThings()) {
            if (item.id === id) {
                return item.authToken;
            }
        }
        return null;
    }

    getRootThingIdFromThing(parentHierarchy: string[][], thingId) {
        if (parentHierarchy !== null && parentHierarchy.length >= 3 &&
            +parentHierarchy[1][0] === 2) {
            // Public thing hierarchy (children) access
            return +parentHierarchy[2][0];
        } else if (parentHierarchy !== null && parentHierarchy.length === 2 &&
            +parentHierarchy[1][0] === 2) {
            // Root public thing
            return thingId;
        } else {
            return null;
        }
    }
}
