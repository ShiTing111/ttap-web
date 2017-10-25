import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class UpdateUserProfileName extends ActionGenerator < IUserProfileState > {
  private newName : string;
  public constructor(newName : string) {
    super();
    this.newName = newName;
  }
  protected GenerateNewState(state : IUserProfileState) : IUserProfileState {
    return {
      ...state,
      FirstName: this.newName
    };
  }

  protected TypeName() : string {return "update user profile name"; }
}
