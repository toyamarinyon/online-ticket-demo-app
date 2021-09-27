import { BaseError } from 'lib/util/errors/base-error'

export class AuthError extends BaseError {}
export class AuthUnhandledError extends AuthError {}
export class AuthUserDisabledError extends AuthError {}
export class AuthWrongPasswordError extends AuthError {}
export class AuthInvalidPasswordError extends AuthError {}
export class AuthUserNotFoundError extends AuthError {}
export class AuthInvalidEmailError extends AuthError {}
export class AuthMissingContinueUriError extends AuthError {}
export class AuthInvalidContinueUriError extends AuthError {}
export class AuthUnauthorizedContinueUriError extends AuthError {}
export class AuthEmailAlreadyExistsError extends AuthError {}
