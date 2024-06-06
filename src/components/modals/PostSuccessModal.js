import { Modal, Text } from '@mantine/core';

const PostSuccessModal = (props) => {
  const {
    slowTransitionOpened,
    title,
    actions,
  } = props;

  return (
    <Modal
      opened={slowTransitionOpened}
      onClose={() => {}}
      title={title}
      centered
      transitionProps={{ transition: 'rotate-left' }}
    >
      <Text ta="center" sx={{ marginBottom: '75px' }}>What do you want to do next</Text>
      <div className="text-gray-500 font font-bold text-right">
        <div className="">

          {actions.map((action, index) => {
            const { name, handler } = action;

            return (
              <button
                key={index}
                className="bg-green-500 text-white px-6 text-[15px] py-2 rounded-[4px]"
                onClick={() => handler()}
                type="button"
                style={{ marginRight: '7px' }}
              >
                {name}
              </button>

            )
          })}
        </div>
      </div>
    </Modal>
  );
};

export default PostSuccessModal;
