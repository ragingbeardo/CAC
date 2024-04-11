export class ModConfig
{
    public shutErDown: boolean = false;
    public enableDebug: boolean = false;
    public removeSecureContainerFilters: boolean = false;
    public removeBackpackFilters: boolean = false;
    public removeSimpleContainerFilters: boolean = false;

    constructor(shutErDown: boolean)
    {
        this.shutErDown = shutErDown;
    }
}