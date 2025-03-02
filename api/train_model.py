import numpy as np
import pandas as pd
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
import lightgbm as lgb
from imblearn.pipeline import Pipeline as imbPipeline
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler
import pickle as pickle
import joblib

data = pd.read_csv('data_finish.csv')

print(data.columns)

columns_to_drop = ['station_id', 'station_name', 'region_name', 'date']

data = data.drop(columns=columns_to_drop)

print(data.head)

data.isnull().sum()

data = data.dropna()

data.shape

data.rename(columns={'Tn': 'min_temp (°C)', 'Tx': 'max_temp (°C)',
                     'Tavg': 'avg_temp (°C)', 'RH_avg': 'avg_humidity (%)', 'RR': 'rainfall (mm)',
                     'ss': 'sunshine_duration (hours)', 'ff_x': 'max_wind_speed (m/s)',
                     'ddd_x': 'wind_direction_at_max (°)', 'ff_avg': 'avg_wind_speed (m/s)',
                     'ddd_car': 'max_wind_direction (°)'}, inplace=True)

data = data.drop(columns=['max_wind_direction (°)'])

print(data.columns)

print(data.dtypes)

print(data.head)

print(data.head)

# featured engineering that captures combined affects of these variables on floods
data['rainfall_humidity_interaction'] = data['rainfall (mm)'] * data['avg_humidity (%)']

features = ['min_temp (°C)', 'max_temp (°C)', 'avg_temp (°C)', 'avg_humidity (%)',
            'sunshine_duration (hours)', 'max_wind_speed (m/s)', 'wind_direction_at_max (°)',
            'avg_wind_speed (m/s)', 'rainfall (mm)',
            'rainfall_humidity_interaction']
X = data[features]
y = data['flood']

# pipeline consists of smote to balance classes and create synthetic samples for the minority class
# standardscalar normalizes features
pipeline_lr = imbPipeline([
    ('smote', SMOTE(random_state=42)),
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression(random_state=42, max_iter=1000))
])

pipeline_xgb = imbPipeline([
    ('smote', SMOTE(random_state=42)),
    ('scaler', StandardScaler()),
    ('classifier', XGBClassifier(eval_metric='logloss', random_state=42))
])

pipeline_lgb = imbPipeline([
    ('smote', SMOTE(random_state=42)),
    ('scaler', StandardScaler()),
    ('classifier', lgb.LGBMClassifier(random_state=42))
])

scoring = {
    'accuracy': 'accuracy',
    'auc': 'roc_auc',
    'precision': 'precision',
    'recall': 'recall',
    'f1': 'f1',
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)

results_lr = cross_validate(pipeline_lr, X, y, cv=cv, scoring=scoring)
results_xgb = cross_validate(pipeline_xgb, X, y, cv=cv, scoring=scoring)
results_lgb = cross_validate(pipeline_lgb, X, y, cv=cv, scoring=scoring)

def print_results(name, results):
  print(f"{name}:")
  print("Accuracy: {:.4f} ± {:.4f}".format(np.mean(results['test_accuracy']), np.std(results['test_accuracy'])))
  print("AUC: {:.4f} ± {:.4f}".format(np.mean(results['test_auc']), np.std(results['test_auc'])))
  print("Precision: {:.4f} ± {:.4f}".format(np.mean(results['test_precision']), np.std(results['test_precision'])))
  print("Recall: {:.4f} ± {:.4f}".format(np.mean(results['test_recall']), np.std(results['test_recall'])))
  print("F1 Score: {:.4f} ± {:.4f}".format(np.mean(results['test_f1']), np.std(results['test_f1'])))

print_results("Logistic Regression", results_lr)
print_results("XGBoost", results_xgb)
print_results("LightGBM", results_lgb)

best_model = pipeline_lgb

print(data.loc[5])

test_data = pd.DataFrame({
    'min_temp (°C)': 23.1, 
    'max_temp (°C)': 35, 
    'avg_temp (°C)': 29.05, 
    'avg_humidity (%)': 75,
    'sunshine_duration (hours)': 3.5, 
    'max_wind_speed (m/s)': 5, 
    'wind_direction_at_max (°)': 180,
    'avg_wind_speed (m/s)': 1, 
    'rainfall (mm)': 4,
    'rainfall_humidity_interaction': 300 
}, index=[0])

best_model.fit(X, y)
predicted_flood = best_model.predict(test_data)
print(f"Chance of Flood:{predicted_flood[0]:.2f}")

joblib.dump(best_model, 'model.pkl')
