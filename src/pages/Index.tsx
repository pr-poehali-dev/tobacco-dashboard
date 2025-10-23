import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import DashboardSection from '@/components/DashboardSection';
import POSSection from '@/components/POSSection';
import ClientsSection from '@/components/ClientsSection';
import { OrdersSection, DeliverySection } from '@/components/OrdersDelivery';
import { ProductsSection, WarehouseSection } from '@/components/ProductsWarehouse';
import { AnalyticsSection, ReportsSection } from '@/components/AnalyticsReports';

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

export default Index;
