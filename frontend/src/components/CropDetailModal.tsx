import { CropRecommendation } from '../types';

interface CropDetailModalProps {
    crop: CropRecommendation;
    onClose: () => void;
}

export function CropDetailModal({ crop, onClose }: CropDetailModalProps) {
    // Enhanced crop data based on common crop info
    const getGrowingInfo = (cropName: string) => {
        const info: Record<string, any> = {
            Rice: {
                water: 'High',
                soil: 'Clay, Loamy',
                ph: '5.5 - 7.0',
                temp: '20-35°C',
                season: 'Monsoon',
                duration: '3-6 months',
                sunlight: 'Full sun',
            },
            Wheat: {
                water: 'Moderate',
                soil: 'Loamy, Well-drained',
                ph: '6.0 - 7.5',
                temp: '10-25°C',
                season: 'Winter',
                duration: '4-5 months',
                sunlight: 'Full sun',
            },
            // Default for other crops
            default: {
                water: 'Moderate',
                soil: 'Well-drained',
                ph: '6.0 - 7.0',
                temp: '15-30°C',
                season: 'Spring/Summer',
                duration: '3-4 months',
                sunlight: 'Full sun',
            },
        };

        return info[cropName] || info.default;
    };

    const growingInfo = getGrowingInfo(crop.common_name);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-header">
                    <h2>{crop.common_name}</h2>
                    <p className="modal-scientific">{crop.scientific_name}</p>
                    <div className="modal-suitability">
                        <span className="suitability-badge">{crop.suitability}% Suitable</span>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <h3>Why This Crop?</h3>
                        <p>{crop.description}</p>
                    </div>

                    <div className="modal-section">
                        <h3>Growing Requirements</h3>
                        <div className="requirements-grid">
                            <div className="requirement-item">
                                <span className="req-icon">💧</span>
                                <div className="req-content">
                                    <div className="req-label">Water Needs</div>
                                    <div className="req-value">{growingInfo.water}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">🌡️</span>
                                <div className="req-content">
                                    <div className="req-label">Temperature</div>
                                    <div className="req-value">{growingInfo.temp}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">🌱</span>
                                <div className="req-content">
                                    <div className="req-label">Soil Type</div>
                                    <div className="req-value">{growingInfo.soil}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">🎯</span>
                                <div className="req-content">
                                    <div className="req-label">Soil pH</div>
                                    <div className="req-value">{growingInfo.ph}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">☀️</span>
                                <div className="req-content">
                                    <div className="req-label">Sunlight</div>
                                    <div className="req-value">{growingInfo.sunlight}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">📅</span>
                                <div className="req-content">
                                    <div className="req-label">Season</div>
                                    <div className="req-value">{growingInfo.season}</div>
                                </div>
                            </div>

                            <div className="requirement-item">
                                <span className="req-icon">⏱️</span>
                                <div className="req-content">
                                    <div className="req-label">Duration</div>
                                    <div className="req-value">{growingInfo.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="modal-action-button" onClick={onClose}>
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
