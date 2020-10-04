import React, { Component } from "react";
import { Table, Space, Input } from "antd";
import { Button } from "@material-ui/core";
import { SearchOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
export class TableRows extends Component {
  state = {
    // *** Sort
    filteredInfo: null,
    sortedInfo: null,
    // *** Search
    searchText: "",
    searchedColumn: "",
  };

  // *** Sort
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  // *** Search
  getColumnSearchProps = (dataIndex, nameInput) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${nameInput}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(
              selectedKeys[0],
              confirm,
              dataIndex,
              setSelectedKeys
            )
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              this.handleSearch(
                selectedKeys[0],
                confirm,
                dataIndex,
                setSelectedKeys
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => text,
  });

  // *** Search
  handleSearch = (selectedKeys, confirm, dataIndex, setSelectedKeys) => {
    setSelectedKeys(selectedKeys ? [selectedKeys.toString().trim()] : []);
    confirm();
    this.setState({
      searchText: selectedKeys,
      searchedColumn: dataIndex,
    });
  };

  // *** Search
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const {
      rows,
      columns,
      rowKey,
      handleCheckbox,
      loading,
      expandable,
      className,
      hidePagination,
      hideScroll,
      disableColumn,
    } = this.props;

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || defaultFilteredValues || {};

    const rowSelection = {
      onChange: (selectedRowKeys) => {
        handleCheckbox(selectedRowKeys);
      },
      getCheckboxProps: disableColumn,
    };

    return (
      <div>
        <Table
          rowSelection={handleCheckbox ? { ...rowSelection } : false}
          className={className || "table table-striped"}
          loading={loading}
          rowKey={rowKey ? rowKey : ""}
          expandable={expandable}
          scroll={hideScroll !== true ? { x: 750 } : false}
          dataSource={rows ? rows : []}
          onChange={this.handleChange}
          pagination={
            hidePagination !== true
              ? {
                  pageSizeOptions: ["10", "20", "30", "50", "100"],
                  showSizeChanger: true,
                }
              : false
          }
        >
          {columns &&
            columns.length > 0 &&
            columns.map((item) =>
              item.group ? ( // *** group columns
                <ColumnGroup
                  title={item.title}
                  width={item.width}
                  align={item.align}
                >
                  {item.columnGroups.map((element) => (
                    <Column
                      title={element.title}
                      align={element.align}
                      dataIndex={element.dataIndex}
                      key={element.key}
                      width={element.width}
                      filteredValue={
                        element.dataIndex
                          ? filteredInfo[`${element.dataIndex}`] || null
                          : ""
                      }
                      {...(element.search
                        ? this.getColumnSearchProps(
                            `${element.dataIndex}`,
                            `${element.title}`
                          )
                        : "")}
                      render={element.render}
                      onFilter={
                        element.dataIndex
                          ? (value, record) =>
                              record[`${element.dataIndex}`]
                                .toString()
                                .toLowerCase()
                                .includes(value.toString().toLowerCase())
                          : ""
                      }
                      sorter={
                        element.dataIndex
                          ? (a, b) =>
                              a[`${element.dataIndex}`]
                                ? a[`${element.dataIndex}`]
                                    .toString()
                                    .localeCompare(b[`${element.dataIndex}`])
                                : ""
                          : ""
                      }
                      sortOrder={
                        element.dataIndex
                          ? sortedInfo.columnKey === `${element.dataIndex}` &&
                            sortedInfo.order
                          : ""
                      }
                    />
                  ))}
                </ColumnGroup>
              ) : (
                <Column
                  title={item.title} // column name
                  align={item.align} // position of data
                  dataIndex={item.dataIndex} // value
                  key={item.key} // value
                  width={item.width} // width such as width: 25%
                  filters={
                    item.filters && item.filters.length > 0
                      ? item.filters.map((item) => ({
                          text: item.text,
                          value: item.value,
                        }))
                      : false
                  }
                  ellipsis={item.ellipsis ? item.ellipsis : false} // substring, when it too long
                  {...(item.search
                    ? this.getColumnSearchProps(
                        `${item.dataIndex}`,
                        `${item.title}`
                      )
                    : "")}
                  render={item.render}
                  filteredValue={
                    item.dataIndex
                      ? filteredInfo[`${item.dataIndex}`] || null
                      : ""
                  }
                  onFilter={
                    item.dataIndex
                      ? (value, record) =>
                          record[`${item.dataIndex}`] &&
                          record[`${item.dataIndex}`]
                            .toString()
                            .toLowerCase()
                            .includes(value.toString().toLowerCase())
                      : ""
                  }
                  sorter={
                    item.dataIndex && item.sorter !== false
                      ? (a, b) =>
                          a[`${item.dataIndex}`] &&
                          a[`${item.dataIndex}`]
                            .toString()
                            .localeCompare(b[`${item.dataIndex}`])
                      : ""
                  }
                  sortOrder={
                    item.dataIndex
                      ? sortedInfo.columnKey === `${item.dataIndex}` &&
                        sortedInfo.order
                      : ""
                  }
                />
              )
            )}
        </Table>{" "}
      </div>
    );
  }
}

export default TableRows;
