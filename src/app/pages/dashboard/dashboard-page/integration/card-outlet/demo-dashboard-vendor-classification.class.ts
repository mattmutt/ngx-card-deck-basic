// multiple groups within the vendors supported
import { DemoDashboardVendorClassificationMap } from "./demo-dashboard-card-outlet-render-definitions.interface";
import { DemoDashboardOrganizerPackageEnumeration } from "./demo-dashboard-organizer-package.class";

// used in template mappings
export const demoDashboardVendorClassificationMap: DemoDashboardVendorClassificationMap = {
    // 0 represents contributor's framework
    '0': {
        organizerPackage: DemoDashboardOrganizerPackageEnumeration.com_company_acme_shared_library,
        organization: 'acme-framework',
        description: 'framework supplier'
    },
    // sample 3 derived from com_company_starter
    '3': {
        organizerPackage: DemoDashboardOrganizerPackageEnumeration.com_company_starter,
        organization: 'project3',
        description: 'Sample testing dashboard #3 - 1 summary billboard'
    },

    // custom sample packaging classification
    custom_sample: {
        organizerPackage: DemoDashboardOrganizerPackageEnumeration.com_company_starter,
        organization: 'custom_sample', // per card metadata "templates > body > organization"
        description: 'custom sample in com_company_starter'
    },

};

