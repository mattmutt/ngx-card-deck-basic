import { getEnumeratedKeyString } from "ngx-card-deck";

export enum DemoDashboardOrganizerPackageEnumeration {
    // hardcode: must statically CLONE from engine `OrganizerPackageEnumerationBase`
    internal = 1,

    // customized
    com_company_acme_shared_library, // team shared framework, shared stuff
    com_company_starter // Example starter project

}


// string-based enumeration key resolution
export function getOrganizerPackageKey(enumeration: DemoDashboardOrganizerPackageEnumeration): string {
    return getEnumeratedKeyString<typeof DemoDashboardOrganizerPackageEnumeration>(DemoDashboardOrganizerPackageEnumeration, enumeration);
}

