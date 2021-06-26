import {
  Dispatch,
  KeyboardEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useRef,
  useState
} from 'react';
import wait from 'waait';

export type GetTabItemProps = (id: string) => {
  id: string;
  role: string;
  'aria-selected': boolean;
  tabIndex: number;
  onClick: MouseEventHandler;
  onKeyDown: (e: KeyboardEvent) => void;
};

export type GetTabContentProps = (id: string) => {
  'aria-hidden': boolean;
  'aria-labelledby': string;
};

export function useTabs(initialSelectedItem?: string): {
  getTabItemProps: GetTabItemProps;
  getTabContentProps: GetTabContentProps;
  setSelectedTab: Dispatch<SetStateAction<string | undefined>>;
} {
  const contentRefs = useRef<Record<string, HTMLElement>>({});
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    initialSelectedItem
  );

  const onTabItemClick = useCallback(
    (id: string) => () => {
      setSelectedItem(id);
    },
    []
  );

  const onTabItemKey = useCallback(
    (id: string) => async (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const ref = contentRefs.current[id];
        onTabItemClick(id)();

        if (ref) {
          await wait(1);
          ref.setAttribute('tabindex', '-1');
          ref.focus();
        }
      }
    },
    [onTabItemClick]
  );

  const addTabContentRef = useCallback(
    (id: string) => (element: HTMLElement) => {
      contentRefs.current[id] = element;
    },
    []
  );

  const getTabItemProps: GetTabItemProps = useCallback(
    (id: string) => {
      const isSelected = id === selectedItem;

      return {
        'aria-selected': isSelected,
        id: `tab-item-${id}`,
        onClick: onTabItemClick(id),
        onKeyDown: onTabItemKey(id),
        role: 'link',
        tabIndex: 0
      };
    },
    [selectedItem, onTabItemKey, onTabItemClick]
  );

  const getTabContentProps: GetTabContentProps = useCallback(
    (id: string) => {
      const isSelected = id === selectedItem;

      return {
        'aria-hidden': !isSelected,
        'aria-labelledby': `tab-item-${id}`,
        ref: addTabContentRef(id)
      };
    },
    [selectedItem, addTabContentRef]
  );

  return {
    getTabItemProps,
    getTabContentProps,
    setSelectedTab: setSelectedItem
  };
}
