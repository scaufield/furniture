export type TUserName = string;
export type TUser = {
  id: TUniqueId;
  name: TUserName;
  email: TEmail;
};

// export function hasAllergy(user: TUser, ingredient: TIngredient): boolean {
//   return user.allergies.includes(ingredient);
// }
//
// export function hasPreference(user: TUser, ingredient: TIngredient): boolean {
//   return user.preferences.includes(ingredient);
// }
