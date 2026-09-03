export interface IUserProfile {
  id: string;
  username: string;
  email?: string;
  hasPin: boolean;
  pinHash?: string;
  biometricsEnabled: boolean;
  currency: string;
  privacyBlurDefault: boolean;
}
