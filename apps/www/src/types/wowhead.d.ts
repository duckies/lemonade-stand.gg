declare global {
  interface Window {
    WH?: {
      Icon: {
        getIconUrl: (...args: any[]) => string;
      };
      Tooltips: {
        init: () => void;
      };
    };
    $WowheadPower?: {
      refreshLinks: () => void;
    };
  }
}

export {};
