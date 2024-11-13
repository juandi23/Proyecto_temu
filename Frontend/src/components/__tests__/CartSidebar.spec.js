import { mount } from '@vue/test-utils';
import CartSidebar from '@/components/CartSidebar.vue'; // Asegúrate de que la ruta sea correcta

// Mock de localStorage para evitar interacciones con el almacenamiento real
global.localStorage = {
    getItem: jest.fn().mockReturnValue(JSON.stringify([{ id: 1, title: 'Product 1', price: 100, quantity: 2 }])),
    setItem: jest.fn(),
  };
  

// Mock de Snipcart
global.window.Snipcart = {
  api: {
    theme: {
      cart: {
        open: jest.fn(),
      },
    },
  },
};

describe('CartSidebar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CartSidebar, {
      props: { isOpen: true },
    });
  });

  it('should load cart items from localStorage', () => {
    expect(global.localStorage.getItem).toHaveBeenCalledWith('cart');
    expect(wrapper.vm.cartItems.length).toBe(2);
  });

  it('should increase quantity of an item', async () => {
    const initialQuantity = wrapper.vm.cartItems[0].quantity;
    const increaseButton = wrapper.findAll('button').at(1); // El botón "+" del primer producto
    await increaseButton.trigger('click');

    expect(wrapper.vm.cartItems[0].quantity).toBe(initialQuantity + 1);
    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  it('should decrease quantity of an item', async () => {
    const initialQuantity = wrapper.vm.cartItems[0].quantity;
    const decreaseButton = wrapper.findAll('button').at(0); // El botón "-" del primer producto
    await decreaseButton.trigger('click');

    expect(wrapper.vm.cartItems[0].quantity).toBe(initialQuantity - 1);
    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  it('should remove an item from the cart', async () => {
    const removeButton = wrapper.findAll('button.remove-btn').at(0); // El botón "Eliminar" del primer producto
    await removeButton.trigger('click');

    expect(wrapper.vm.cartItems.length).toBe(1); // El carrito ahora debe tener solo 1 producto
    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  it('should calculate the correct cart total', () => {
    const cartTotal = wrapper.vm.cartTotal;
    expect(cartTotal).toBe('400.00'); // El total debería ser 100*2 + 200*1 = 400
  });

  it('should call Snipcart API to open the cart when clicking "Hacer pedido"', async () => {
    const checkoutButton = wrapper.find('button.snipcart-checkout');
    await checkoutButton.trigger('click');

    expect(window.Snipcart.api.theme.cart.open).toHaveBeenCalled();
  });
});
