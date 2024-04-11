import { DependencyContainer, Lifecycle } from "tsyringe";

import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";

import { ConfigUtil } from "./util/ConfigUtil";
import { ModConfig } from "./model/ModConfig";
import { CAC } from "./CAC";

class Mod implements IPreAkiLoadMod, IPostDBLoadMod
{

    private modConfig: ModConfig;

    public preAkiLoad(container: DependencyContainer): void
    {
        container.register<CAC>("CAC", CAC, {lifecycle: Lifecycle.Singleton});
        container.register<ConfigUtil>("ConfigUtil", ConfigUtil, {lifecycle: Lifecycle.Singleton});

        //parse the config and store the values
        this.modConfig = container.resolve<ConfigUtil>("ConfigUtil").parseModConfig();
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const tables: IDatabaseTables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const itemTemplates = Object.values(tables.templates.items);

        const secureContainers = itemTemplates.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.MOB_CONTAINER));
        const backpacks = itemTemplates.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.BACKPACK));
        const simpleContainers = itemTemplates.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.SIMPLE_CONTAINER));;

        container.resolve<CAC>("CAC").removeSecureContainerFilters(secureContainers, this.modConfig);
        container.resolve<CAC>("CAC").removeBackpackFilters(backpacks, this.modConfig);
        container.resolve<CAC>("CAC").removeSimpleContainerFilters(simpleContainers, this.modConfig);
    }
    
}

module.exports = { mod: new Mod() }