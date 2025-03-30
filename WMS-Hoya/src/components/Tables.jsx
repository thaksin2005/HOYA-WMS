import { useState, useEffect } from "react";
import { ConfigProvider, Table } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body{},
          ${antCls}-table-content {
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const Tables = ({
  columns,
  dataSource,
  bordered,
  scrollY,
  scrollX,
  pagination,
  maxHeight,
  rowSelection,
}) => {
  const { styles } = useStyle();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [adjustedScrollY, setAdjustedScrollY] = useState(scrollY);
  const [quickJumper, setQuickJumper] = useState(true);
  const [showSizeChanger, setShowSizeChanger] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 829) {
        setQuickJumper(false);
        setShowSizeChanger(false);
      } else {
        setQuickJumper(true);
        setShowSizeChanger(true);
      }

      if (window.innerWidth < 1074) {
        setAdjustedScrollY(0.5);
      } else {
        setAdjustedScrollY(scrollY);
      }
    };

    handleResize(); // Call once to set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollY]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--table-offset", maxHeight);
  }, [maxHeight]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  // };


  return (
    <ConfigProvider
      theme={{
      components: {
        Table: {
          headerBg: "#E6F7FF",
          headerSortActiveBg: "#75D3FF",
          headerSortHoverBg: "#75D3FF",
          headerSplitColor: "#1D75E8",
          rowSelectedBg: "#E6F7FF",
        },
      },
    }}>
    <Table
      className={styles.customTable}
      rowSelection={rowSelection}
      bordered={bordered}
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={
        pagination === "close"
          ? false
          : {
              showSizeChanger: showSizeChanger,
              showQuickJumper: quickJumper,
              pageSizeOptions: ["5", "10", "20", "50", "100"],
              defaultPageSize: 20,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }
      }
      scroll={{
        y: window.innerHeight * adjustedScrollY,
        x: scrollX,
      }}
    />
    </ConfigProvider>
  );
};
export default Tables;
