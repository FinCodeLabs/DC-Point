import React, { useState } from 'react';
import { DEFAULT_IMAGES } from '../data/mockData';
import leatherBagImg from '../assets/leather_bag.jpg';
import neonSignImg from '../assets/neon_sign.jpg';
import pcbBoardImg from '../assets/pcb_board.jpg';
import honeyJarImg from '../assets/honey_jar.jpg';
import cinemaCameraImg from '../assets/cinema_camera.jpg';
import djSystemImg from '../assets/dj_system.png';
import droneRigImg from '../assets/drone_rig.png';
import audioPackImg from '../assets/audio_pack.png';
import lightingKitImg from '../assets/lighting_kit.png';
import woodKeyboardImg from '../assets/wood_keyboard.png';
import edcToolImg from '../assets/edc_tool.png';
import alpacaBlanketImg from '../assets/alpaca_blanket.png';
import redCameraImg from '../assets/red_camera.png';
import vrCameraImg from '../assets/vr_camera.png';
import strobePackImg from '../assets/strobe_pack.png';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  FileText,
  Lock,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export default function CreateListingModal({ onClose, onCreateSuccess, currentUser }) {
  const PRESET_IMAGES = [
    { label: 'Leather Crafts', src: leatherBagImg },
    { label: 'Cinema Camera', src: cinemaCameraImg },
    { label: 'Neon Signage', src: neonSignImg },
    { label: 'Wood Keyboard', src: woodKeyboardImg },
    { label: 'DJ System', src: djSystemImg },
    { label: 'Drone Rig', src: droneRigImg },
    { label: 'Audio Pack', src: audioPackImg },
    { label: 'Studio Light', src: lightingKitImg },
    { label: 'EDC Tool', src: edcToolImg },
    { label: 'PCB Board', src: pcbBoardImg },
    { label: 'Honey Jar', src: honeyJarImg },
    { label: 'Alpaca Wool', src: alpacaBlanketImg },
    { label: 'RED Camera', src: redCameraImg },
    { label: 'VR Camera', src: vrCameraImg },
    { label: 'Strobe Flash', src: strobePackImg }
  ];

  const [formData, setFormData] = useState({
    title: '',
    category: 'Craft & Goods',
    type: 'purchase',
    price: '',
    unit: 'per piece',
    rentalDeposit: '150',
    description: '',
    customizationOptions: 'Custom size, embossed initials, custom packaging box',
    deliveryTimeframeDays: '5',
    inspectionWindowHours: '48',
    selectedImageSrc: leatherBagImg,
    customImageUrl: ''
  });

  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'passed'
  const [scanStepText, setScanStepText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartScan = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description) {
      alert('Please fill in title, price, and description before running compliance check.');
      return;
    }

    setScanState('scanning');
    setScanStepText('Checking restricted & hazardous goods database...');

    setTimeout(() => {
      setScanStepText('Scanning IP rights, copyright & trademark registries...');
    }, 1200);

    setTimeout(() => {
      setScanStepText('Validating trade contract terms & safety guarantees...');
    }, 2400);

    setTimeout(() => {
      setScanState('passed');
      setScanStepText('AI Compliance Passed! Listing is approved and legal contract template generated.');
    }, 3600);
  };

  const handleFinalPublish = () => {
    const finalImage = formData.customImageUrl.trim() || formData.selectedImageSrc || 
      (formData.type === 'rent' ? cinemaCameraImg : leatherBagImg);

    const newListing = {
      id: `prod-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      type: formData.type,
      price: parseFloat(formData.price),
      unit: formData.unit,
      rentalDeposit: formData.type === 'rent' ? parseFloat(formData.rentalDeposit) : 0,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerRating: currentUser.rating || 4.95,
      sellerCompletedTrades: currentUser.completedTrades || 1,
      complianceStatus: 'Verified',
      complianceBadgeText: 'AI Compliance Passed • Legal Contract Ready',
      image: finalImage,
      description: formData.description,
      specifications: [
        { label: 'Category', value: formData.category },
        { label: 'Lead Time', value: `${formData.deliveryTimeframeDays} Business Days` },
        { label: 'Customization', value: formData.customizationOptions }
      ],
      sampleAgreementTerms: {
        deliveryWindowDays: parseInt(formData.deliveryTimeframeDays),
        inspectionWindowHours: parseInt(formData.inspectionWindowHours),
        allowCustomPackaging: true,
        qualityStandard: 'Zero defect surface, pre-delivery photo proof required'
      },
      suggested: true,
      bestSeller: false
    };

    onCreateSuccess(newListing);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: '#00ADB5', color: '#FFFFFF', padding: '0.35rem', borderRadius: '8px' }}>
              <PlusCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Seller Studio — List Item or Service</h3>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>AI Compliance & Legal Agreement Generator</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {scanState === 'idle' && (
            <form onSubmit={handleStartScan} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Market Type Switch */}
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '10px', display: 'flex', gap: '1rem', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="purchase" 
                    checked={formData.type === 'purchase'} 
                    onChange={handleChange}
                  />
                  Purchase Market (Product / Custom Service)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name="type" 
                    value="rent" 
                    checked={formData.type === 'rent'} 
                    onChange={handleChange}
                  />
                  Rent Market (Gear / Equipment Rental)
                </label>
              </div>

              {/* Title & Category */}
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                    Listing Title *
                  </label>
                  <input 
                    type="text"
                    name="title"
                    placeholder="e.g. Handcrafted Leather Satchel / 4K Camera Setup"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Craft & Goods">Craft & Goods</option>
                    <option value="Tech & Electronics">Tech & Electronics</option>
                    <option value="Industrial & Tools">Industrial & Tools</option>
                    <option value="Rentals">Rentals</option>
                  </select>
                </div>
              </div>

              {/* Price & Unit */}
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                    {formData.type === 'rent' ? 'Daily Rental Rate (₹) *' : 'Escrow Sales Price (₹) *'}
                  </label>
                  <input 
                    type="number"
                    name="price"
                    placeholder="e.g. 185"
                    value={formData.price}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                    {formData.type === 'rent' ? 'Security Deposit (₹)' : 'Pricing Unit'}
                  </label>
                  {formData.type === 'rent' ? (
                    <input 
                      type="number"
                      name="rentalDeposit"
                      value={formData.rentalDeposit}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    />
                  ) : (
                    <input 
                      type="text"
                      name="unit"
                      placeholder="e.g. per piece / per batch of 10"
                      value={formData.unit}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Description & Quality Standards *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe your item, craftsmanship details, materials, or rental terms..."
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              {/* Product Image Picker */}
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0B192C', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                  <ImageIcon size={16} color="#00ADB5" /> Product Image Options
                </div>

                <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Choose from suitable preset images or provide a custom image URL:
                </label>

                {/* Thumbnail Preset Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
                  gap: '0.5rem',
                  maxHeight: '130px',
                  overflowY: 'auto',
                  padding: '0.25rem',
                  marginBottom: '0.75rem',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}>
                  {PRESET_IMAGES.map((imgItem, idx) => {
                    const isSelected = formData.selectedImageSrc === imgItem.src && !formData.customImageUrl;
                    return (
                      <div
                        key={idx}
                        onClick={() => setFormData(prev => ({ ...prev, selectedImageSrc: imgItem.src, customImageUrl: '' }))}
                        style={{
                          border: isSelected ? '2px solid #00ADB5' : '1px solid #E2E8F0',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          background: isSelected ? '#E0F2FE' : '#FFFFFF',
                          textAlign: 'center',
                          padding: '2px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <img 
                          src={imgItem.src} 
                          alt={imgItem.label} 
                          style={{ width: '100%', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                        <div style={{ fontSize: '0.65rem', fontWeight: '600', color: isSelected ? '#00ADB5' : '#475569', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {imgItem.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#64748B', marginBottom: '0.25rem' }}>
                    Or Custom Image URL:
                  </label>
                  <input
                    type="url"
                    name="customImageUrl"
                    placeholder="https://images.unsplash.com/... or data:image/..."
                    value={formData.customImageUrl}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.45rem 0.65rem', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              {/* Trade Contract Settings */}
              <div style={{ background: '#ECFDF5', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <FileText size={16} /> Legal Contract Parameters (Enforceable on Trade)
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '600' }}>Fulfillment Window (Days):</label>
                    <input 
                      type="number" 
                      name="deliveryTimeframeDays" 
                      value={formData.deliveryTimeframeDays} 
                      onChange={handleChange} 
                      style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid #A7F3D0' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '600' }}>Buyer Inspection Hours:</label>
                    <input 
                      type="number" 
                      name="inspectionWindowHours" 
                      value={formData.inspectionWindowHours} 
                      onChange={handleChange} 
                      style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid #A7F3D0' }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}>
                <Zap size={18} />
                <span>Run AI Compliance Pre-Screening</span>
              </button>
            </form>
          )}

          {/* Scanning Animation State */}
          {scanState === 'scanning' && (
            <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#E0F2FE',
                color: '#00ADB5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                animation: 'spin 1.5s linear infinite'
              }}>
                <Zap size={32} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                AI Compliance Scanning in Progress...
              </h3>

              <p style={{ color: '#00ADB5', fontWeight: '600', fontSize: '0.95rem', minHeight: '30px' }}>
                {scanStepText}
              </p>

              <div style={{ width: '100%', background: '#E2E8F0', height: '8px', borderRadius: '4px', marginTop: '1.5rem', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #00ADB5, #10B981)',
                  width: '75%',
                  transition: 'width 2s ease'
                }} />
              </div>
            </div>
          )}

          {/* Passed State */}
          {scanState === 'passed' && (
            <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0B192C', marginBottom: '0.5rem' }}>
                AI Compliance Pre-Screening Passed!
              </h3>

              <p style={{ color: '#64748B', maxWidth: '500px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
                Your listing zeroed out restricted goods risks and passed IP safety checks. A legally binding trade contract template has been assigned.
              </p>

              <div style={{
                background: '#F8FAFC',
                border: '1px dashed #CBD5E1',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'left',
                fontSize: '0.85rem'
              }}>
                <div><strong>Status:</strong> <span className="badge badge-verified">Compliance Verified (Live)</span></div>
                <div style={{ marginTop: '0.4rem' }}><strong>Assigned Hash:</strong> <code>#DC-HASH-{Math.floor(1000 + Math.random()*9000)}-LEGAL</code></div>
              </div>

              <button className="btn-primary" onClick={handleFinalPublish} style={{ width: '100%', padding: '0.85rem' }}>
                Publish Listing to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
