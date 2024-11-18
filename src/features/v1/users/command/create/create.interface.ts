interface IDataUser {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

interface IDataUserRole {
  userId: string;
  roleId: number;
  createdAt: string;
}

interface IDataUserRoleBranches {
  userRole: IDataUserRole;
  branchCode: string;
  createdAt: string;
}

interface IDataPublish {
  userId: string;
  name: string;
  email: string;
  phone: string;
  roles: [];
}

export { IDataUser, IDataUserRole, IDataUserRoleBranches, IDataPublish };
