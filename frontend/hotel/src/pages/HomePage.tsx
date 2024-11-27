import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import HotelList from "../components/HotelList";
import { MainLayout } from "../layouts/MainLayout";
import HotelsTable from "../components/HotelsTable";

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <Tabs aria-label="Hotel Options">
        <Tab key="hotel-list" title="Listado de Hoteles">
          <HotelList />
        </Tab>
        <Tab key="hotels-table" title="Gestion Hoteles">
          <HotelsTable />
        </Tab>
      </Tabs>
    </MainLayout>
  );
};
