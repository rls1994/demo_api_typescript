import UserRole from "../../core/model/UserRole";
import FormatDate from '../../core/lib/DateFormat';

export interface IUserRoleResponse {
  id: string | null,
  name: string,
  permissions: string[],
  created_on: string
}

export default class UserRoleResponse{
    
    static format(userRole: UserRole[]): IUserRoleResponse[]{

        let returnResponse = userRole.map(singleUserRole => {
            let createdDate = singleUserRole.getCreatedOn();
            let res: IUserRoleResponse = {
                id: singleUserRole.getId(),
                name: singleUserRole.getName(),
                permissions: singleUserRole.getPermissions(),
                created_on: createdDate ? FormatDate.format("YYYY/MM/DD HH:MM",createdDate) : "NA"
            }
            return res
        })
        return returnResponse;
    }
}