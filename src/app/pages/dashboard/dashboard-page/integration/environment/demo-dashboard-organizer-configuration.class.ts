import {
    DemoDashboardOrganizerPackageEnumeration,
    getOrganizerPackageKey as demoGetOrganizerPackageKey
} from "../card-outlet/demo-dashboard-organizer-package.class";
import { CompanyStarterDashboardConfigurationsCache } from "../../client/common/com.company.starter/lib/services/dashboard/configurations-cache";
import { ContainerOrganizerConfigurable } from "ngx-card-deck";
import { DashboardConfigurationSchemaFileFetchable } from "ngx-card-deck";


// ~~~~~~~~~~~ demonstration of vendor organizations to support multi-tenant dashboard ~~~~~~~~~~~
export class DemoDashboardOrganizerConfiguration implements ContainerOrganizerConfigurable {

    // cached resources
    public configurationSchemaFileFetchMap: Map<string, DashboardConfigurationSchemaFileFetchable> = new Map();

    constructor() {

        // ~~~~~~~~~~~~~~ component definitions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // company sample 3 illustrates the simple care preprocessor metadata transformer
        this.configurationSchemaFileFetchMap.set(demoGetOrganizerPackageKey(DemoDashboardOrganizerPackageEnumeration.com_company_starter), new CompanyStarterDashboardConfigurationsCache());

    }

}
