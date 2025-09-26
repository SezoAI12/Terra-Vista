
import { useState } from 'react';
import PropertyDetailModal from './PropertyDetailModal';

interface PropertyCardProps {
  property: any;
  viewMode: 'grid' | 'list';
  showAIInsights?: boolean;
  onPropertyClick?: (property: any) => void;
  onFavorite?: (propertyId: number) => void;
  onShare?: (property: any) => void;
}

export default function PropertyCard({ 
  property, 
  viewMode, 
  showAIInsights = false,
  onPropertyClick,
  onFavorite,
  onShare 
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite?.(property.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(property);
  };

  const handleClick = () => {
    setShowModal(true);
    onPropertyClick?.(property);
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-80 h-64 md:h-auto relative flex-shrink-0">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {property.transactionType || property.type}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-full backdrop-blur-sm ${
                    isFavorited ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'
                  } transition-colors`}
                >
                  <i className={`${isFavorited ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <i className="ri-share-line text-lg"></i>
                </button>
              </div>
              {showAIInsights && (
                <div className="absolute bottom-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-bold text-gray-900">AI: {property.growthScore}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6" onClick={handleClick}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-gray-600 flex items-center">
                    <i className="ri-map-pin-line mr-1"></i>
                    {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{property.price}</div>
                  {showAIInsights && property.aiInsights && (
                    <div className="text-sm text-green-600">AI: {property.aiInsights.valuation}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <span className="flex items-center">
                  <i className="ri-hotel-bed-line mr-1"></i>
                  {property.bedrooms} Beds
                </span>
                <span className="flex items-center">
                  <i className="ri-drop-line mr-1"></i>
                  {property.bathrooms} Baths
                </span>
                <span className="flex items-center">
                  <i className="ri-fullscreen-line mr-1"></i>
                  {property.area} {property.areaUnit || 'sq ft'}
                </span>
              </div>
              
              {property.features && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities?.slice(0, 4).map((feature: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                  {property.amenities?.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{property.amenities.length - 4} more
                    </span>
                  )}
                </div>
              )}
              
              {showAIInsights && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{property.roi}</div>
                      <div className="text-gray-500">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{property.rentalYield || 'N/A'}</div>
                      <div className="text-gray-500">Yield</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{property.aiInsights?.investmentGrade || 'A'}</div>
                      <div className="text-gray-500">Grade</div>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <PropertyDetailModal
          property={property}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border cursor-pointer group">
        <div className="relative h-64">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.transactionType || property.type}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm ${
                isFavorited ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:text-red-500'
              } transition-colors`}
            >
              <i className={`${isFavorited ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <i className="ri-share-line text-lg"></i>
            </button>
          </div>
          {showAIInsights && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-900">AI Score: {property.growthScore}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6" onClick={handleClick}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-600 flex items-center">
                <i className="ri-map-pin-line mr-1"></i>
                {property.location}
              </p>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-4">{property.price}</div>
          
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span className="flex items-center">
              <i className="ri-hotel-bed-line mr-1"></i>
              {property.bedrooms}
            </span>
            <span className="flex items-center">
              <i className="ri-drop-line mr-1"></i>
              {property.bathrooms}
            </span>
            <span className="flex items-center">
              <i className="ri-fullscreen-line mr-1"></i>
              {property.area} {property.areaUnit || 'sq ft'}
            </span>
          </div>
          
          {property.amenities && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 3).map((feature: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {feature}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}
          
          {showAIInsights && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex space-x-3 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{property.roi}</div>
                  <div className="text-gray-500">ROI</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{property.rentalYield || 'N/A'}</div>
                  <div className="text-gray-500">Yield</div>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Details
              </button>
            </div>
          )}
        </div>
      </div>
      
      <PropertyDetailModal
        property={property}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
