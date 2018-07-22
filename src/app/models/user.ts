// User representa al usuario en general, Administrator, Promoter y Supervisor
export interface User {
    uid?: string; // Id 
    name?: string; // Nombre
    email?: string; //correo electronico 
    curp?: string; // CURP
    rfc?: string; //RFC
    nss?: string; // Numero de seguridad social
    password?: string; // Contraseña (login)
    employeeKey?: string; // Tipo de empleado
    status?: boolean; // Estatus del empleado
    isDataLoader: boolean;
    isDataUploader: boolean;
    agency: string;
}
export interface Administrator extends User { 
    isAdmin?: boolean;
}
export interface Promoter extends User { 
    city: string;
    state: string;
    address: string;
    contractDateBegin: Date; // Fecha de inicio de contrato
    contractDateExp: Date; // Fecha de fin de contrato
    birthDate: Date; // Fecha de nacimiento
    postalCode: string; //Codigo postal
    image: string, // Fotografia
}
export interface Supervisor extends User {
    city: string;
    state: string;
    address: string;
    contractDateBegin: Date;
    contractDateExp: Date;
    birthDate: Date;
    postalCode: string;
    image: string,
}