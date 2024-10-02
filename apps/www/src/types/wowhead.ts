declare global {
  interface Window {
    $WowheadPower?: {
      refreshLinks: () => void;
    };
  }
}
