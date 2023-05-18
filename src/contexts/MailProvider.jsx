import { createContext, useEffect, useReducer } from "react";
import { mails } from "../apis/mails";

export const MailContext = createContext();

export function MailProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "initial-load": {
        return {
          ...state,
          inbox: [...action.payload]
        };
      }

      case "show-unread": {
        return {
          ...state,
          showUnread: !state.showUnread
        };
      }

      case "show-starred": {
        return {
          ...state,
          showStarred: !state.showStarred
        };
      }

      case "star-unstar": {
        const newList = [...state.inbox].map((obj) =>
          obj.mId === action.payload
            ? { ...obj, isStarred: !obj.isStarred }
            : obj
        );
        return { ...state, inbox: [...newList] };
      }

      case "read-unread": {
        const newList = [...state.inbox].map((obj) =>
          obj.mId === action.payload ? { ...obj, unread: !obj.unread } : obj
        );
        return { ...state, inbox: [...newList] };
      }

      case "delete-mail": {
        const newInbox = [...state.inbox].filter(
          (obj) => obj.mId !== action.payload
        );
        const newTrashItem = [...state.inbox].find(
          (obj) => obj.mId === action.payload
        );
        return {
          ...state,
          inbox: [...newInbox],
          trash: [...state.trash, { ...newTrashItem }]
        };
      }

      case "restore-mail-trash": {
        const newTrash = [...state.trash].filter(
          (obj) => obj.mId !== action.payload
        );
        const newInboxItem = [...state.trash].find(
          (obj) => obj.mId === action.payload
        );
        return {
          ...state,
          inbox: [...state.inbox, { ...newInboxItem }],
          trash: [...newTrash]
        };
      }

      case "report-spam": {
        const newInbox = [...state.inbox].filter(
          (obj) => obj.mId !== action.payload
        );
        const newSpamItem = [...state.inbox].find(
          (obj) => obj.mId === action.payload
        );
        return {
          ...state,
          inbox: [...newInbox],
          spam: [...state.spam, { ...newSpamItem }]
        };
      }

      case "restore-mail-spam": {
        const newSpam = [...state.spam].filter(
          (obj) => obj.mId !== action.payload
        );
        const newInboxItem = [...state.spam].find(
          (obj) => obj.mId === action.payload
        );
        return {
          ...state,
          inbox: [...state.inbox, { ...newInboxItem }],
          spam: [...newSpam]
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    inbox: [],
    trash: [],
    spam: [],
    showUnread: false,
    showStarred: false
  });

  useEffect(() => {
    const getData = () => {
      dispatch({ type: "initial-load", payload: [...mails] });
    };
    getData();
  }, []);

  return (
    <>
      <MailContext.Provider
        value={{
          inbox: state.inbox,
          showUnread: state.showUnread,
          showStarred: state.showStarred,
          trash: state.trash,
          spam: state.spam,
          dispatch
        }}
      >
        {children}
      </MailContext.Provider>
    </>
  );
}
