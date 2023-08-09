import { Tabs } from "antd";
import Theatres from "../../pages/Theatres/Theatres";
import PageTitle from "../PageTitle/PageTitle";
import Movies from "../../pages/Movies/Movies";

function AdminTab() {
  return (
    <>
      <PageTitle title={"Admin"} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key={1}>
          <Movies />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key={2}>
          <Theatres />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

export default AdminTab;
