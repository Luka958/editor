import React, {useEffect, useState} from "react";
import TextComponent from "./TextComponent";
import Tab from "./Tab";
import {File} from "../logic/NPTypes";

export default function TabbedPane() {

  const [tabs, setTabs] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<File>(null);
  const [closedActiveTab, setClosedActiveTab] = useState(false);
  const [modified, setModified] = useState(null);

  useEffect(() => {
    window.electron.fileApi.openFile((file: File) => {
      file.modified = false;
      setTabs(tabs => [...tabs, file]);
      setActiveTab(file);
    });
  }, []);

  function removeTab(arr: File[], obj: File): File[] {
    const index = arr.indexOf(obj);
    if (index > -1) {
      arr.splice(index, 1);
    }
    // using the slice method in order to make a shallow copy,
    // React won't rerender otherwise
    return arr.slice();
  }

  useEffect(() => {
    if (closedActiveTab) {
      setActiveTab(tabs.length > 0 ? tabs.at(tabs.length - 1) : null);
      setClosedActiveTab(false);
    }
  }, [closedActiveTab]);

  useEffect(() => {
    console.log(modified)
  }, [modified]);

  function updateModificationStatus(modified: boolean): void {
    const newTabs = tabs.map(tab => {
      if (tab === activeTab) {
        return { ...tab, modified: modified };
      }
      return tab;
    });
    setTabs(newTabs);
  }

  return (
    <>
      <div className="flex-direction-row">
        {tabs.map(tab =>
          <Tab key={tab.path}
               file={tab}
               activePane={activeTab}
               setActivePane={() => setActiveTab(tab)}
               close={() => {
                 setClosedActiveTab(true);
                 setTabs(removeTab(tabs, tab));
               }}
               modified={tab.modified}
          />
        )}
      </div>
      {activeTab !== null &&
        <TextComponent key={activeTab.path}
                       content={activeTab.content}
                       setModified={modified => updateModificationStatus(modified)}
        />
      }
    </>
  );
}