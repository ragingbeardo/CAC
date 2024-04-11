import { inject, injectable } from "tsyringe";
import { LoggingUtil } from "./util/LoggingUtil";
import { ModConfig } from "./model/ModConfig";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

@injectable()
export class CAC
{

    constructor(
        @inject("LoggingUtil") private loggingUtil: LoggingUtil
    ) 
    {
    }

    public removeSecureContainerFilters(secureContainers: ITemplateItem[], modConfig: ModConfig): void
    {
        if ( modConfig.removeSecureContainerFilters )
        {
            for ( const secureContainer of secureContainers )
            {
                secureContainer._props.Grids[0]._props.filters = [];
                this.loggingUtil.green("ContainersAreContainers: Removed filters from your secure containers.", modConfig.enableDebug);
            }
        }
    }

    public removeBackpackFilters(backpacks: ITemplateItem[], modConfig: ModConfig): void
    {
        if ( modConfig.removeBackpackFilters )
        {
            for ( const backpack of backpacks )
            {
                backpack._props.Grids[0]._props.filters = [];
                this.loggingUtil.green("ContainersAreContainers: Removed filters from your backpacks.", modConfig.enableDebug);
            }
        }
    }

    public removeSimpleContainerFilters(simpleContainers: ITemplateItem[], modConfig: ModConfig): void
    {
        if ( modConfig.removeSimpleContainerFilters )
        {
            for ( const simpleContainer of simpleContainers )
            {
                simpleContainer._props.Grids[0]._props.filters = [];
                this.loggingUtil.green("ContainersAreContainers: Removed filters from your simple containers.", modConfig.enableDebug);
            }
        }
    }

}