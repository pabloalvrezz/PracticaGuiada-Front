/**
 * Define los datos de un usuario.
 */
export class User {
  /**
   * ID del usuario.
   */
  id!: string;
  /**
   * Nombre.
   */
  name!: string;
  /**
   * Correo electrónico.
   */
  email!: string;
  /**
   * Indica si está habilitado.
   */
  enabled!: boolean;
  /**
   * Indica si las credenciales están expiradas.
   */
  credentialsNonExpired!: boolean;
  /**
   * Indica si lia cuenta está expirada.
   */
  accountNonExpired!: boolean;
  /**
   * Indica si la cuenta está bloqueada.
   */
  accountNonLocked!: boolean;
  /**
   * Contraseña.
   */
  password!: string;
  /**
   * Hash para la recuperación de la contraseña.
   */
  passwordRecoveryHash!: string;
  /**
   * Indica que se está cambiando la contraseña.
   */
  passwordChanged!: boolean;
  /**
   * Nombre del usuario.
   */
  username!: string;
  /**
   * País del usuario.
   */
  country!: string;
  /**
   * Ciudad del usuario.
   */
  city!: string;
  /**
   * Idioma.
   */
  language!: string;
  /**
   * Dirección.
   */
  address!: string;
  /**
   * Lista de roles.
   */
  roles!: string[];
}

/**
 * Rol de usuario.
 */
export class Authority {
  /**
   * Nombre del rol.
   */
  authority!: string;
}
