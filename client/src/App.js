import React, { useEffect, useState } from 'react';
import { Form, Button, Layout, Menu, Breadcrumb, Popover, Table, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined, FormOutlined } from '@ant-design/icons';
import { getPlatforms, updatePlatform } from './routes/routes';
import PlatformModal from './views/platforms/platformModal';
import './common/css/commonStyles.css';
import 'antd/dist/antd.css';
import './App.css';


const App = () => {

  const [platformData, setPlatformData] = useState([]);
  const [uploadPopoverVisible, setUploadPopoverVisible] = useState(false);

  const [platformUpdateModalData, setPlatformUpdateModalData] = useState({});
  const [isPlatformUpdateModalOpen, setPlatformUpdateModalOpen] = useState(false);

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;



  // ------------- Use Effects
  useEffect(() => {
    getPlatforms(setPlatformDataTable);
  }, []);

  // ------------ Handlers
  const setPlatformDataTable = data => {
    setPlatformData(data);
  };

  const edit = record => {
    const updateModalObj = {
      _id: record._id,
      platDisplayName: record.platDisplayName,
    };

    setPlatformUpdateModalData(updateModalObj);
    togglePlatformUpdateModal();
  };

  // ------------- Toggles
  const togglePlatformUpdateModal = () => {
    const action = isPlatformUpdateModalOpen ? false : true;
    setPlatformUpdateModalOpen(action);
  }

  // ----------------- dispatchers Api

  const handleUpdatePlatformModal = platform => {
    updatePlatform(platform);
  };

  const UploadContent = () => {
    const props = {
      name: 'file',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          debugger;
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>)
  };

  const platformColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Display Name',
      dataIndex: 'platDisplayName',
      key: 'platDisplayName',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <Button
            className="edit-btn"
            onClick={() => edit(record)}
            icon={<FormOutlined />}
          />
        );
      },
    },
  ]
  return (
    <Layout>
      <Header className="header" />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Ammo Content DB">
              <Menu.Item key="1">Platforms</Menu.Item>
              <Menu.Item key="3">Library</Menu.Item>
              <Menu.Item key="4">Rights</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Platforms</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Popover
                  content={<UploadContent />}
                  title="Click to Upload Csv File"
                  trigger="click"
                  visible={uploadPopoverVisible}
                  onVisibleChange={() => setUploadPopoverVisible(!uploadPopoverVisible)}
                >
                  <Button type="primary">Import Csv File</Button>
                </Popover>
              </Form.Item>
            </Form>
            <Table
              columns={platformColumns}
              dataSource={platformData}
            />
            {isPlatformUpdateModalOpen ?
              <PlatformModal
                currentModalData={platformUpdateModalData}
                isModalOpen={isPlatformUpdateModalOpen}
                toggleModal={togglePlatformUpdateModal}
                handleModal={handleUpdatePlatformModal}
              /> : null}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App;
