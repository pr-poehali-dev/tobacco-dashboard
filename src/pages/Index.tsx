import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

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
    { id: 'pos', label: 'Касса', icon: 'CreditCard', color: 'text-orange-400' },
    { id: 'clients', label: 'Клиенты', icon: 'Users', color: 'text-cyan-400' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingBag', color: 'text-blue-400' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck', color: 'text-purple-400' },
    { id: 'products', label: 'Товары', icon: 'Package2', color: 'text-green-400' },
    { id: 'warehouse', label: 'Склад', icon: 'Warehouse', color: 'text-yellow-400' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3', color: 'text-pink-400' },
    { id: 'reports', label: 'Отчеты', icon: 'FileText', color: 'text-indigo-400' }
  ];

  const quickActions = [
    { label: 'Новая продажа', icon: 'Plus', gradient: 'from-orange-500 to-pink-500' },
    { label: 'Добавить товар', icon: 'PackagePlus', gradient: 'from-cyan-500 to-blue-500' },
    { label: 'Новый клиент', icon: 'UserPlus', gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Создать заказ', icon: 'ShoppingCart', gradient: 'from-green-500 to-emerald-500' }
  ];

  const recentOrders = [
    { id: '#3547', product: 'Вейп IQOS', amount: '₽2,350', status: 'Завершен', time: '12:45' },
    { id: '#3548', product: 'Табак Adalya', amount: '₽890', status: 'В обработке', time: '13:12' },
    { id: '#3549', product: 'Одноразка Elf Bar', amount: '₽650', status: 'Доставка', time: '13:28' },
    { id: '#3550', product: 'Energy Red Bull', amount: '₽180', status: 'Завершен', time: '14:05' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F3460] via-[#1A1A2E] to-[#0F3460]">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-black/20 backdrop-blur-sm border-r border-white/10">
          <div className="p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
              VapeUp
            </h1>
            <p className="text-sm text-gray-400 mt-1">Дашборд продавца</p>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Добро пожаловать в VapeUp</h2>
            <p className="text-gray-400">Управление продажами и складом в одном месте</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
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
        </main>
      </div>
    </div>
  );
};

export default Index;
