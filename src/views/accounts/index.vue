<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-button type="link" @click="routeTo(record)">{{ record.name }}</a-button>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: editAccount.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="openModal">新建</a-button>
        <a-button type="waring" @click="delACC">删除</a-button>
      </template>
    </BasicTable>
    <AccountsModel @register="register" :minHeight="100" @model-close="modelClose" />
    <AccountsModel @register="register1" :minHeight="100" @model-close="modelClose" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, ColumnChangeParam, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './accountsData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getStates } from '/@/api/states/states';
  // model
  import { useModal } from '/@/components/Modal';
  import AccountsModel from './components/accountsModel.vue';

  import { delAccount } from '/@/api/account/account';

  const { createMessage } = useMessage();

  const [register, { openModal: openModal1 }] = useModal();
  const openModal = () => {
    openModal1(true, { updateMode: false });
  };
  const [register1, { openModal: openModal2 }] = useModal();

  function onChange() {
    console.log('onChange', arguments);
  }
  const [registerTable, { reload, getSelectRows }] = useTable({
    canResize: true,
    title: '账户管理',
    api: getStates,
    clickToRowSelect: false,
    columns: getBasicColumns(),
    defSort: {
      field: 'name',
      order: 'ascend',
    },
    rowKey: 'id',
    showTableSetting: true,
    onChange,
    rowSelection: {
      type: 'checkbox',
    },
    onColumnsChange: (data: ColumnChangeParam[]) => {
      console.log('ColumnsChanged', data);
    },
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  const routeTo = (record: any) => {
    console.log(record);
  };

  const delACC = async () => {
    const list = await getSelectRows();
    if (list.length === 0) {
      createMessage.error('请选择要删除的账户');
      return;
    }
    const ids = list.map((item: any) => item.id as string);
    Promise.all(ids.map((id: string) => delAccount({ id }))).then(() => {
      createMessage.success('删除成功');
      reload();
    });
  };

  // 编辑账号
  const editAccount = (record: Recordable) => {
    console.log('editAccount');
    openModal2(true, { updateMode: true, data: record });
  };

  const modelClose = () => {
    console.log('modelClose');
    reload({
      page: 1,
    });
  };
</script>
