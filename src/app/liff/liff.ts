import liff from '@line/liff';

export interface Profile {
  userId: string;
  displayName: string;
  pictureUrl: string;
  statusMessage?: string;
}

export const initializeLiff = async (): Promise<void> => {
  const liffId:string = process.env.LIFF_ID || '';
  try {
    await liff.init({ liffId: liffId }); // 必要なLIFF IDを設定
    console.log('LIFF initialized');
  } catch (error) {
    console.error('LIFF initialization failed', error);
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const profile = await liff.getProfile();
    return profile as Profile;
  } catch (error) {
    console.error('Failed to get profile', error);
    return null;
  }
};
