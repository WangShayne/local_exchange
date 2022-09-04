<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="新建账户"
    @ok="confirmForm"
    @cancel="cancelForm"
  >
    <template v-if="loading">
      <div class="empty-tips">
        <a-spin />
      </div>
    </template>
    <template v-if="!loading">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="别名">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="apiKey">
          <a-input v-model:value="formState.apiKey" />
        </a-form-item>
        <a-form-item label="secretKey">
          <a-input v-model:value="formState.secretKey" />
        </a-form-item>
      </a-form>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createAccoutApi, updateAccoutApi, getAccoutById } from '/@/api/account/account';
  import { useMessage } from '/@/hooks/web/useMessage';
  const emit = defineEmits(['modelClose', 'register']);
  const loading = ref(true);
  const updateACC = ref(false);

  const { createMessage } = useMessage();
  const { success } = createMessage;

  const randomLetter = (len: number) => {
    let x = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    let tmp = '';
    for (let i = 0; i < len; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
  };

  // 表单
  const formState = reactive({
    id: '',
    name: '',
    apiKey: '',
    secretKey: '',
  });

  // model模型
  const [register, { setModalProps, closeModal }] = useModalInner(async (data: any) => {
    formState.id = '';
    formState.name = randomLetter(6);
    formState.apiKey = randomLetter(64);
    formState.secretKey = randomLetter(64);
    loading.value = true;
    const { updateMode } = data;
    if (updateMode) {
      const {
        data: { id, name, apiKey },
      } = data;

      const account = await getAccoutById(id);
      console.log(account);
      updateACC.value = true;
      formState.id = id;
      formState.name = name;
      formState.apiKey = apiKey;
      formState.secretKey = account.secret_key as string;
    } else {
      updateACC.value = false;
    }
    loading.value = false;
  });

  // 确认
  const confirmForm = () => {
    if (updateACC.value) {
      setModalProps({ confirmLoading: true });
      updateAccoutApi(formState)
        .then(() => {
          success('更新成功');
          setModalProps({ confirmLoading: false });
          emit('modelClose');
          closeModal();
        })
        .catch(() => {
          setModalProps({ confirmLoading: false });
        });
    } else {
      setModalProps({ confirmLoading: true });
      createAccoutApi(formState)
        .then(() => {
          success('创建成功');
          setModalProps({ confirmLoading: false });
          emit('modelClose');
          closeModal();
        })
        .catch(() => {
          setModalProps({ confirmLoading: false });
        });
    }
  };

  // 取消
  const cancelForm = () => {
    closeModal();
  };
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
