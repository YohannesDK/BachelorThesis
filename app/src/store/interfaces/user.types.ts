export enum RoleType {
  Student = "STUDENT",
  Teacher = "TEACHER"
}

export type UserType = {
  UserID: number;
  UserName: string;
  Role: RoleType.Student | RoleType.Teacher;
  FirstName?: string;
  LastName?: string;
};
