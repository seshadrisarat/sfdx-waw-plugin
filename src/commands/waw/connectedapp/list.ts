import {SfdxCommand} from '@salesforce/command';

export default class List extends SfdxCommand {

  public static description = 'List the connected apps in your org';

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<any> { // tslint:disable-line:no-any
    
    // refresh auth
    await this.org.refreshAuth();

    var types = [{type: 'ConnectedApp', folder: null}];
    this.org.getConnection().metadata.list(types, '42.0', (readErr, metadataResult) => {
      if (readErr) {
        this.ux.error(readErr);
        return;
      }
      this.ux.logJson(metadataResult);
    });
  }
}
