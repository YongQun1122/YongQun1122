import _ from "lodash";
import { store } from "@store";
// import { Permission } from "@graphql";

interface ValidateAccessOption {
  exact?: boolean;
}
export const validateAccess = (permissions: string | string[], options?: ValidateAccessOption): boolean => {
  if (_.isEmpty(permissions)) return true;

  if (_.get(store.getState(), "auth.user.role.fullAccess") === true) return true;
  const userPermissions = _.map(_.get(store.getState(), "auth.user.role.permissions") || [], p => p.permission);

  try {
    if (_.isArray(permissions)) {
      if (options?.exact === true) {
        _.map(permissions, p => {
          if (!_.includes(userPermissions, p)) throw new Error("Permission Denied");
        });
        return true;
      } else {
        return userPermissions.some(p => permissions.includes(p));
      }
    } else {
      if (!_.includes(userPermissions, permissions)) throw new Error("Permission Denied");
      return true;
    }
  } catch (e) {
    return false;
  }
};
