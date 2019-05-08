import { NgModule, Type } from "@angular/core";
import { DashboardCardPluggable, ServiceRenderClass } from "ngx-card-deck";
import { IntroductionComponent } from "../../client/common/com.company.starter/lib/views/card-assembly-plugins/introduction/introduction.component";
import { IntroductionService } from "../../client/common/com.company.starter/lib/views/card-assembly-plugins/introduction/introduction.service";
import { SimpleIntroductionTemplateComponent } from "../../client/common/com.company.starter/lib/views/card-templates/components/simple-introduction/simple-introduction-template.component";
import { ComCompanyStarterTemplateModule } from "../../client/common/com.company.starter/lib/views/card-templates/modules/com_company_starter_template.module";

import { DemoDashboardCardOutletExtensionViewRender } from "./demo-dashboard-card-outlet-render-definitions.interface";
import { DemoDashboardOrganizerPackageEnumeration } from "./demo-dashboard-organizer-package.class";
import { demoDashboardVendorClassificationMap } from "./demo-dashboard-vendor-classification.class";



// promise contract fails with AoT due to complex expression
// -------- individual template setup :: static compilation encoding requires a function --------------

// demo simple introduction
export function demoClientSimpleIntroductionTemplateTransport() {
    return Promise.resolve(SimpleIntroductionTemplateComponent);
}


// ------------ Framework examples -----------

// ====== Introduction Card (simple) ==========
export const demoClientIntroductionCardViewRenderCompartment: DemoDashboardCardOutletExtensionViewRender<any> = {
    identifier: "card-introduction",
    organizerPackage: DemoDashboardOrganizerPackageEnumeration.com_company_starter,
    componentClass: IntroductionComponent,
    viewProviders: [IntroductionService],

    // optional template association
    resolveTemplatableClassesList: [{
        classification: demoDashboardVendorClassificationMap.custom_sample,
        load: demoClientSimpleIntroductionTemplateTransport, // simple by default
        //loadModuleRoute: for deferred lazy loading
    }]
};



// -------------------------------------------------------------
// +++++++++++++++ sample extensions ++++++++++++++++++++++++++
// -------------------------------------------------------------


// arranged set of definitions
export const demoDashboardAllocatedCardOutletExtensionViewRenderDefinitionsList: Array<DemoDashboardCardOutletExtensionViewRender<any>> = [
    demoClientIntroductionCardViewRenderCompartment, // custom sample card outlet
];


// Specialization modules hosted at CardOutletModule level. Shall be exposed to all `componentClass` instances
// AoT requirement - provide unique set of Modules
export function demoGetAllocatedModulesList(): Array<Type<NgModule>> {

    return [
        ComCompanyStarterTemplateModule, // contains: Custom sample
    ];

}

// AoT requirement - determine custom components linked in for view renderer
export function demoGetAllocatedComponentsList(): Array<Type<DashboardCardPluggable<any>>> {
    return [
        demoClientIntroductionCardViewRenderCompartment.componentClass
    ];
}

// AoT requirement - determine custom components linked in for service renderer
export function demoGetAllocatedServicesList(): Array<ServiceRenderClass<any>> {
    // fix later as multiple services are added
    return [
        ...demoClientIntroductionCardViewRenderCompartment.viewProviders,
    ];
}

// AoT requirement - determine directives
export function demoGetAllocatedDirectivesList(): Array<Type<any>> {
    // fix later as multiple services are added
    return [
        // ...demoClientMetricsBillboardCardViewRenderCompartment.directives!
    ];
}

