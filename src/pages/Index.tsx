import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentEmployee, setCurrentEmployee] = useState<string | null>(null);
  const [shiftStartTime, setShiftStartTime] = useState<string | null>(null);
  const [showShiftDialog, setShowShiftDialog] = useState(true);

  const employees = ['Иван Петров', 'Мария Сидорова', 'Алексей Коваль', 'Ольга Смирнова'];

  const startShift = (employee: string) => {
    setCurrentEmployee(employee);
    setShiftStartTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    setShowShiftDialog(false);
  };

  const stats = [
    {
      title: 'Продажи сегодня',
      value: '₽47,350',
      change: '+12.5%',
      icon: 'TrendingUp',
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      title: 'Заказов',
      value: '156',
      change: '+8.2%',
      icon: 'ShoppingCart',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Товаров на складе',
      value: '1,234',
      change: '-3.1%',
      icon: 'Package',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Клиентов',
      value: '892',
      change: '+15.3%',
      icon: 'Users',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Главная', icon: 'Home', color: 'text-white' },
    { id: 'pos', label: 'Касса', icon: 'CreditCard', color: 'text-orange-400' },
    { id: 'clients', label: 'Клиенты', icon: 'Users', color: 'text-cyan-400' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingBag', color: 'text-blue-400' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck', color: 'text-purple-400' },
    { id: 'products', label: 'Товары', icon: 'Package2', color: 'text-green-400' },
    { id: 'warehouse', label: 'Склад', icon: 'Warehouse', color: 'text-yellow-400' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3', color: 'text-pink-400' },
    { id: 'reports', label: 'Отчеты', icon: 'FileText', color: 'text-indigo-400' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'pos':
        return <POSSection />;
      case 'clients':
        return <ClientsSection />;
      case 'orders':
        return <OrdersSection />;
      case 'delivery':
        return <DeliverySection />;
      case 'products':
        return <ProductsSection />;
      case 'warehouse':
        return <WarehouseSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <DashboardSection stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F3460] via-[#1A1A2E] to-[#0F3460]">
      <Dialog open={showShiftDialog} onOpenChange={setShowShiftDialog}>
        <DialogContent className="bg-[#1A1A2E] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">Начать смену</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Выберите сотрудника</Label>
              <Select onValueChange={startShift}>
                <SelectTrigger>
                  <SelectValue placeholder="Кто на смене?" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex">
        <aside className="w-64 min-h-screen bg-black/20 backdrop-blur-sm border-r border-white/10">
          <div className="p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
              VapeUp
            </h1>
            <p className="text-sm text-gray-400 mt-1">Дашборд продавца</p>
            
            {currentEmployee && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="User" className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">На смене</span>
                </div>
                <p className="text-sm font-medium">{currentEmployee}</p>
                <p className="text-xs text-gray-400 mt-1">с {shiftStartTime}</p>
              </div>
            )}
          </div>
          
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-orange-500/20 to-cyan-500/20 border border-orange-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardSection = ({ stats }: any) => {
  const quickActions = [
    { label: 'Новая продажа', icon: 'Plus', gradient: 'from-orange-500 to-pink-500', action: 'pos' },
    { label: 'Добавить товар', icon: 'PackagePlus', gradient: 'from-cyan-500 to-blue-500', action: 'products' },
    { label: 'Новый клиент', icon: 'UserPlus', gradient: 'from-purple-500 to-indigo-500', action: 'clients' },
    { label: 'Создать заказ', icon: 'ShoppingCart', gradient: 'from-green-500 to-emerald-500', action: 'orders' }
  ];

  const recentOrders = [
    { id: '#3547', product: 'Вейп IQOS', amount: '₽2,350', status: 'Завершен', time: '12:45' },
    { id: '#3548', product: 'Табак Adalya', amount: '₽890', status: 'В обработке', time: '13:12' },
    { id: '#3549', product: 'Одноразка Elf Bar', amount: '₽650', status: 'Доставка', time: '13:28' },
    { id: '#3550', product: 'Energy Red Bull', amount: '₽180', status: 'Завершен', time: '14:05' }
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Добро пожаловать в VapeUp</h2>
        <p className="text-gray-400">Управление продажами и складом в одном месте</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat: any, index: number) => (
          <Card 
            key={index} 
            className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden animate-fade-in hover:scale-105 transition-transform duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon name={stat.icon} className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            className={`h-24 bg-gradient-to-r ${action.gradient} hover:opacity-90 transition-all duration-200 hover:scale-105 animate-scale-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center gap-2">
              <Icon name={action.icon} className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" className="w-5 h-5 text-orange-400" />
              Последние заказы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-cyan-400">{order.id}</span>
                      <span className="text-sm text-gray-400">{order.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg mb-1">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Завершен' 
                        ? 'bg-green-500/20 text-green-400' 
                        : order.status === 'В обработке'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" className="w-5 h-5 text-purple-400" />
              Популярные товары
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Вейп IQOS', sales: 45, gradient: 'from-orange-500 to-pink-500' },
                { name: 'Elf Bar 5000', sales: 38, gradient: 'from-cyan-500 to-blue-500' },
                { name: 'Табак Adalya', sales: 32, gradient: 'from-purple-500 to-indigo-500' },
                { name: 'Red Bull', sales: 28, gradient: 'from-green-500 to-emerald-500' }
              ].map((product, index) => (
                <div 
                  key={index} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm text-gray-400">{product.sales} шт</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-500`}
                      style={{ width: `${(product.sales / 45) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const POSSection = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Вейп IQOS', price: 2350, category: 'Вейпы', stock: 15 },
    { id: 2, name: 'Elf Bar 5000', price: 650, category: 'Одноразки', stock: 45 },
    { id: 3, name: 'Табак Adalya', price: 890, category: 'Табак', stock: 28 },
    { id: 4, name: 'Red Bull 250ml', price: 180, category: 'Энергетики', stock: 120 },
    { id: 5, name: 'Жижа Salt 30ml', price: 450, category: 'Жижи', stock: 67 },
    { id: 6, name: 'Кальян Amy', price: 5500, category: 'Кальяны', stock: 8 },
  ];

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Касса</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Input
            placeholder="Поиск товара..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border-white/10"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
              <Card 
                key={product.id}
                className="bg-black/40 backdrop-blur-sm border-white/10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <Badge className="mb-2">{product.category}</Badge>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-orange-400">₽{product.price}</p>
                  <p className="text-xs text-gray-400 mt-1">В наличии: {product.stock}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-fit sticky top-8">
          <CardHeader>
            <CardTitle>Корзина</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Корзина пуста</p>
            ) : (
              <>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.quantity} × ₽{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₽{item.price * item.quantity}</p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 px-2 mt-1"
                        >
                          <Icon name="X" className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg">Итого:</span>
                    <span className="text-2xl font-bold text-orange-400">₽{total}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                    Оформить продажу
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ClientsSection = () => {
  const clients = [
    { id: 1, name: 'Дмитрий Иванов', phone: '+7 (999) 123-45-67', purchases: 15, total: 12500, discount: 5 },
    { id: 2, name: 'Анна Петрова', phone: '+7 (999) 234-56-78', purchases: 8, total: 7800, discount: 3 },
    { id: 3, name: 'Сергей Козлов', phone: '+7 (999) 345-67-89', purchases: 23, total: 18900, discount: 10 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Клиенты</h2>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500">
          <Icon name="UserPlus" className="w-4 h-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                  <p className="text-gray-400 mb-1">{client.phone}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-400">Покупок</p>
                      <p className="text-lg font-bold">{client.purchases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Сумма</p>
                      <p className="text-lg font-bold text-green-400">₽{client.total}</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400">Скидка {client.discount}%</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const OrdersSection = () => {
  const orders = [
    { id: '#3551', client: 'Дмитрий Иванов', items: 3, total: 3450, status: 'Новый', date: '23.10.2024' },
    { id: '#3550', client: 'Анна Петрова', items: 1, total: 180, status: 'Завершен', date: '23.10.2024' },
    { id: '#3549', client: 'Сергей Козлов', items: 5, total: 8900, status: 'В обработке', date: '22.10.2024' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Заказы</h2>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Новый заказ
        </Button>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-cyan-400">{order.id}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      order.status === 'Завершен' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Новый' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-1">{order.client}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">{order.items} товара</p>
                  <p className="text-2xl font-bold text-orange-400">₽{order.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const DeliverySection = () => {
  const deliveries = [
    { id: '#D124', courier: 'Алексей', address: 'ул. Ленина, 45', status: 'В пути', time: '14:30', items: 2 },
    { id: '#D123', courier: 'Мария', address: 'пр. Мира, 12', status: 'Доставлено', time: '13:15', items: 1 },
    { id: '#D122', courier: 'Иван', address: 'ул. Советская, 78', status: 'Ожидает', time: '15:00', items: 4 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Доставка</h2>

      <div className="grid gap-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-purple-400">{delivery.id}</h3>
                    <Badge className={
                      delivery.status === 'Доставлено' ? 'bg-green-500/20 text-green-400' :
                      delivery.status === 'В пути' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }>
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Icon name="User" className="w-4 h-4" />
                    <span>Курьер: {delivery.courier}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Icon name="MapPin" className="w-4 h-4" />
                    <span>{delivery.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Icon name="Clock" className="w-4 h-4" />
                    <span>{delivery.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Товаров</p>
                  <p className="text-2xl font-bold">{delivery.items}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const products = [
    { id: 1, name: 'Вейп IQOS', category: 'Вейпы', price: 2350, stock: 15 },
    { id: 2, name: 'Elf Bar 5000', category: 'Одноразки', price: 650, stock: 45 },
    { id: 3, name: 'Табак Adalya', category: 'Табак', price: 890, stock: 28 },
    { id: 4, name: 'Red Bull 250ml', category: 'Энергетики', price: 180, stock: 120 },
    { id: 5, name: 'Жижа Salt 30ml', category: 'Жижи', price: 450, stock: 67 },
    { id: 6, name: 'Кальян Amy', category: 'Кальяны', price: 5500, stock: 8 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Товары</h2>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <Icon name="PackagePlus" className="w-4 h-4 mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <Badge className="mb-3">{product.category}</Badge>
              <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-green-400">₽{product.price}</p>
                  <p className="text-sm text-gray-400 mt-1">Остаток: {product.stock} шт</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Icon name="Edit" className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const WarehouseSection = () => {
  const warehouse = [
    { category: 'Вейпы', items: 45, value: 125000, lowStock: 3 },
    { category: 'Одноразки', items: 156, value: 89000, lowStock: 8 },
    { category: 'Табак', items: 89, value: 67000, lowStock: 2 },
    { category: 'Энергетики', items: 234, value: 42000, lowStock: 0 },
    { category: 'Жижи', items: 123, value: 55000, lowStock: 5 },
    { category: 'Кальяны', items: 23, value: 145000, lowStock: 1 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Склад</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouse.map((item, index) => (
          <Card key={index} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{item.category}</h3>
                {item.lowStock > 0 && (
                  <Badge className="bg-red-500/20 text-red-400">
                    <Icon name="AlertTriangle" className="w-3 h-3 mr-1" />
                    {item.lowStock}
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Товаров</p>
                  <p className="text-2xl font-bold">{item.items} шт</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Стоимость</p>
                  <p className="text-xl font-bold text-green-400">₽{item.value.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AnalyticsSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Аналитика</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Выручка за месяц', value: '₽1,245,000', change: '+18%', gradient: 'from-orange-500 to-pink-500' },
          { label: 'Средний чек', value: '₽780', change: '+5%', gradient: 'from-cyan-500 to-blue-500' },
          { label: 'Продаж в день', value: '52', change: '+12%', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Новых клиентов', value: '127', change: '+23%', gradient: 'from-green-500 to-emerald-500' },
        ].map((stat, index) => (
          <Card key={index} className="bg-black/40 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <Icon name="TrendingUp" className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-sm text-green-400">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black/40 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Продажи по категориям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Вейпы', sales: 450000, percent: 36 },
              { name: 'Одноразки', sales: 320000, percent: 26 },
              { name: 'Табак', sales: 280000, percent: 22 },
              { name: 'Энергетики', sales: 120000, percent: 10 },
              { name: 'Кальяны', sales: 75000, percent: 6 },
            ].map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-gray-400">₽{cat.sales.toLocaleString()} ({cat.percent}%)</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ReportsSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Отчеты</h2>

      <div className="grid gap-6">
        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Отчет по продажам за день</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Выручка</p>
                <p className="text-2xl font-bold text-green-400">₽47,350</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Продано</p>
                <p className="text-2xl font-bold">156 шт</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Заказов</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Средний чек</p>
                <p className="text-2xl font-bold">₽1,127</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
              <Icon name="Download" className="w-4 h-4 mr-2" />
              Скачать отчет
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Отчет по сотрудникам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Иван Петров', sales: 15200, orders: 18 },
                { name: 'Мария Сидорова', sales: 18900, orders: 24 },
                { name: 'Алексей Коваль', sales: 13250, orders: 15 },
              ].map((emp, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm text-gray-400">{emp.orders} заказов</p>
                  </div>
                  <p className="text-xl font-bold text-green-400">₽{emp.sales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
