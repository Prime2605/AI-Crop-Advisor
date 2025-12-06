import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CropRecommendation } from '../types';

type SortField = 'cropName' | 'suitability' | 'expectedYieldIndex' | 'sustainabilityTag';
type SortDirection = 'asc' | 'desc';

export function CropRecommendationsTab() {
  const { state } = useApp();
  const { cropRecommendations, loading, error, selectedLocation } = state;
  const [sortField, setSortField] = useState<SortField>('suitability');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (!selectedLocation) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p>Click on the map to select a location</p>
      </div>
    );
  }

  if (loading.crops) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p>Loading crop recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '24px',
          color: '#d32f2f',
        }}
      >
        <p style={{ fontWeight: '600', marginBottom: '8px' }}>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!cropRecommendations || cropRecommendations.length === 0) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p>No crop recommendations available</p>
      </div>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCrops = [...cropRecommendations].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getSustainabilityColor = (tag: string) => {
    switch (tag) {
      case 'High':
        return '#4caf50';
      case 'Medium':
        return '#ff9800';
      case 'Low':
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '24px' }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginTop: 0, marginBottom: '24px', color: '#1976d2' }}
      >
        Crop Recommendations
      </motion.h2>

      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        <p style={{ margin: 0 }}>
          Showing {cropRecommendations.length} recommendations
        </p>
      </div>

      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  userSelect: 'none',
                  backgroundColor: '#f5f5f5',
                }}
                onClick={() => handleSort('cropName')}
              >
                Crop {getSortIcon('cropName')}
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'right',
                  cursor: 'pointer',
                  userSelect: 'none',
                  backgroundColor: '#f5f5f5',
                }}
                onClick={() => handleSort('suitability')}
              >
                Suitability {getSortIcon('suitability')}
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'right',
                  cursor: 'pointer',
                  userSelect: 'none',
                  backgroundColor: '#f5f5f5',
                }}
                onClick={() => handleSort('expectedYieldIndex')}
              >
                Yield Index {getSortIcon('expectedYieldIndex')}
              </th>
              <th
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  backgroundColor: '#f5f5f5',
                }}
                onClick={() => handleSort('sustainabilityTag')}
              >
                Sustainability {getSortIcon('sustainabilityTag')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCrops.map((crop, index) => (
              <CropRow
                key={index}
                crop={crop}
                getSustainabilityColor={getSustainabilityColor}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed view for selected crop */}
      <div style={{ marginTop: '24px' }}>
        {sortedCrops.map((crop, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            style={{
              marginBottom: '16px',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '8px', color: '#1976d2' }}>
              {crop.cropName}
            </h3>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  Suitability: <strong>{crop.suitability}%</strong>
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  Yield Index: <strong>{crop.expectedYieldIndex}%</strong>
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: getSustainabilityColor(crop.sustainabilityTag),
                    fontWeight: '600',
                  }}
                >
                  {crop.sustainabilityTag} Sustainability
                </span>
              </div>
            </div>
            <div>
              <p style={{ margin: '8px 0 4px 0', fontSize: '12px', color: '#666' }}>
                Reasons:
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {crop.reasons.map((reason, reasonIndex) => (
                  <li key={reasonIndex} style={{ fontSize: '12px', color: '#666' }}>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CropRow({
  crop,
  getSustainabilityColor,
  index,
}: {
  crop: CropRecommendation;
  getSustainabilityColor: (tag: string) => string;
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: '#f0f0f0' }}
      style={{ borderBottom: '1px solid #e0e0e0' }}
    >
      <td style={{ padding: '12px', fontWeight: '600' }}>{crop.cropName}</td>
      <td style={{ padding: '12px', textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <span>{crop.suitability}%</span>
          <div
            style={{
              width: '60px',
              height: '8px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${crop.suitability}%`,
                height: '100%',
                backgroundColor: crop.suitability >= 70 ? '#4caf50' : crop.suitability >= 50 ? '#ff9800' : '#f44336',
              }}
            />
          </div>
        </div>
      </td>
      <td style={{ padding: '12px', textAlign: 'right' }}>{crop.expectedYieldIndex}%</td>
      <td style={{ padding: '12px', textAlign: 'center' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: getSustainabilityColor(crop.sustainabilityTag) + '20',
            color: getSustainabilityColor(crop.sustainabilityTag),
            fontWeight: '600',
            fontSize: '12px',
          }}
        >
          {crop.sustainabilityTag}
        </span>
      </td>
    </motion.tr>
  );
}

