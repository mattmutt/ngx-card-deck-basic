import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { JSONEditorComponent } from "angular-schema-based-json-editor";
import { DeploymentConfigurationBase, PlatformCommunicatorBase, SimpleInlineConfigurationSchema } from "ngx-card-deck";
import { BehaviorSubject, EMPTY, Observable, of, Subject, throwError } from "rxjs";
import { merge } from "rxjs/internal/observable/merge";
import { distinctUntilChanged } from "rxjs/operators";

import * as common from 'schema-based-json-editor';
/* tslint:disable:max-line-length */
import * as simpleDeck3Configuration from "../../../../../mock/network/vendors/extension/com.company.starter/metadata/dashboard/configurations/deck3.json";
import {
    DemoDashboardOrganizerPackageEnumeration,
    getOrganizerPackageKey
} from "../dashboard-page/integration/card-outlet/demo-dashboard-organizer-package.class";
import * as preprocessedDeckJSONSchema from "./simple-deck.schema.json";

const resources = {

    route: {
        organizerPropertyName: "organizer",
        configurationPropertyName: "configuration"
    }

};

// emulate file references to JSON configurations stored in a content management system
const cache = {

    [getOrganizerPackageKey(DemoDashboardOrganizerPackageEnumeration.com_company_starter)]: {
        "deck3": simpleDeck3Configuration.default
    }
};


@Component({
    selector: 'demo-deck-configuration-editor',
    templateUrl: 'demo-deck-configuration-editor.html',
    styleUrls: ['demo-deck-configuration-editor.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDeckConfigurationEditorComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild(JSONEditorComponent, {static: false}) jsonEditor: JSONEditorComponent;

    renderedSourceJSON: SimpleInlineConfigurationSchema;

    preprocessedDeckConfigurationSchema$: Observable<SimpleInlineConfigurationSchema>;
    preprocessedDeckConfigurationErrorSubject$ = new BehaviorSubject(false);
    loadingError$: Observable<boolean>;

    preprocessedDeckJSONSchema = preprocessedDeckJSONSchema.default;

    // collect and recycle in edge case
    private modifiedGoodConfigurationSubject$: Subject<SimpleInlineConfigurationSchema> = new Subject();

    constructor(private fb: FormBuilder,
                private platformCommunicatorService: PlatformCommunicatorBase,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private elem: ElementRef,
                private cdr: ChangeDetectorRef,
                // public demoTransaction: DemoDashboardTransactionAgentService,
                public environmentConfiguration: DeploymentConfigurationBase) {

    }

    ngOnInit() {

        this.initialize();
    }

    // simulate backend call to load JSON
    fetchConfigurationSchema$(organizer: string, resourceId: string): Observable<SimpleInlineConfigurationSchema> {
        try {
            const d = cache[organizer][resourceId];
            if (d) {
                this.renderedSourceJSON = d;
                return of(d);
            } else {
                return throwError(EMPTY);
            }
        } catch (e) {
            return throwError(EMPTY);
        } finally {

        }

    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        // this.cdr.detach();
        // this.routerSub.unsubscribe();
    }

    getStringCharacterCount(content: string): number {
        return content.length;
    }


    onEditorUpdateValue(changed: common.ValidityValue<common.ValueType>) {
        this.renderedSourceJSON = changed.value as SimpleInlineConfigurationSchema;

        // feed immutable changed clone back into component..to reprocess after big change

        /*
        if (this.jsonEditor) {
            console.log("dd", this.jsonEditor);

            //this.jsonEditor.initialValue = JSON.parse(JSON.stringify(this.renderedSourceJSON));

            const j = JSON.parse(JSON.stringify(this.renderedSourceJSON));
            this.modifiedGoodConfigurationSubject$.next(j);
            //this.jsonEditor.updateValue(j)
        }
         */

        this.cdr.markForCheck();
    }


    onCopyToClipboard(sourceInputElement: HTMLTextAreaElement, evt: Event) {
        const range = document.createRange();
        range.selectNode(sourceInputElement);
        window.getSelection()!.addRange(range);

        try {
            const successful = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported
        window.getSelection()!.removeAllRanges();

    }


    private initialize() {


        const routeParam = this.activatedRoute.snapshot.paramMap;
        this.preprocessedDeckConfigurationSchema$ = merge(
            this.modifiedGoodConfigurationSubject$,
            this.fetchConfigurationSchema$(routeParam.get(resources.route.organizerPropertyName)!, routeParam.get(resources.route.configurationPropertyName)!)
        );

        this.preprocessedDeckConfigurationSchema$.subscribe(
            (configurationFile) => {
                this.preprocessedDeckConfigurationErrorSubject$.next(false);
            },
            (error) => {
                this.preprocessedDeckConfigurationErrorSubject$.next(true);
            }
        );

        this.loadingError$ = this.preprocessedDeckConfigurationErrorSubject$.pipe(distinctUntilChanged());
    }
}

