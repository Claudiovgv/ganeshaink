'use client';

import { useReducer } from 'react';
import Step1Category from './Step1Category';
import Step2Service from './Step2Service';
import Step3Employee from './Step3Employee';
import Step4DateTime from './Step4DateTime';
import Step5PersonalData from './Step5PersonalData';
import { Service, Employee, Appointment } from '@/lib/api';

export type Category = 'barbershop' | 'tattoo' | 'piercing' | 'nails';

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5 | 'success';
  category: Category | null;
  service: Service | null;
  employee: Employee | null;
  date: string | null;
  time: string | null;
  appointment: Appointment | null;
}

type Action =
  | { type: 'SET_CATEGORY'; payload: Category }
  | { type: 'SET_SERVICE'; payload: Service }
  | { type: 'SET_EMPLOYEE'; payload: Employee }
  | { type: 'SET_DATETIME'; payload: { date: string; time: string } }
  | { type: 'SET_APPOINTMENT'; payload: Appointment }
  | { type: 'BACK' }
  | { type: 'RESET' };

const initialState: BookingState = {
  step: 1,
  category: null,
  service: null,
  employee: null,
  date: null,
  time: null,
  appointment: null,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, service: null, employee: null, date: null, time: null, step: 2 };
    case 'SET_SERVICE':
      return { ...state, service: action.payload, employee: null, date: null, time: null, step: 3 };
    case 'SET_EMPLOYEE':
      return { ...state, employee: action.payload, date: null, time: null, step: 4 };
    case 'SET_DATETIME':
      return { ...state, date: action.payload.date, time: action.payload.time, step: 5 };
    case 'SET_APPOINTMENT':
      return { ...state, appointment: action.payload, step: 'success' };
    case 'BACK':
      if (state.step === 2) return { ...state, step: 1 };
      if (state.step === 3) return { ...state, step: 2 };
      if (state.step === 4) return { ...state, step: 3 };
      if (state.step === 5) return { ...state, step: 4 };
      return state;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const STEPS = ['Categoria', 'Serviço', 'Artista', 'Data & Hora', 'Dados'];

export default function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.step === 'success' && state.appointment) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h2 className="font-display text-3xl font-bold mb-3 text-gold">Marcação Confirmada!</h2>
        <p className="text-text-secondary mb-2">
          Receberás um email de confirmação em breve.
        </p>
        <div className="bg-bg-card border border-gold-border rounded-lg p-6 mt-8 text-left space-y-3">
          <p><span className="text-text-secondary text-sm">Serviço:</span> <span className="font-semibold">{state.appointment.service.name}</span></p>
          <p><span className="text-text-secondary text-sm">Artista:</span> <span className="font-semibold">{state.appointment.employee.name}</span></p>
          <p><span className="text-text-secondary text-sm">Data:</span> <span className="font-semibold">{new Date(state.appointment.startDatetime).toLocaleString('pt-PT', { dateStyle: 'full', timeStyle: 'short' })}</span></p>
          <p className="text-xs text-text-secondary border-t border-gold-border pt-3">
            Referência: #{state.appointment.id}
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="mt-8 px-6 py-3 border border-gold text-gold rounded hover:bg-gold-muted transition-colors"
        >
          Nova Marcação
        </button>
      </div>
    );
  }

  const currentStep = state.step as number;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const done = currentStep > stepNum;
          const active = currentStep === stepNum;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    done ? 'bg-gold text-bg-primary' : active ? 'bg-gold text-bg-primary' : 'bg-bg-card border border-gold-border text-text-secondary'
                  }`}
                >
                  {done ? '✓' : stepNum}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${active ? 'text-gold' : 'text-text-secondary'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 ${done ? 'bg-gold' : 'bg-gold-border'}`} />
              )}
            </div>
          );
        })}
      </div>

      {state.step === 1 && (
        <Step1Category onSelect={(cat) => dispatch({ type: 'SET_CATEGORY', payload: cat })} />
      )}
      {state.step === 2 && state.category && (
        <Step2Service
          category={state.category}
          onSelect={(s) => dispatch({ type: 'SET_SERVICE', payload: s })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 3 && state.service && (
        <Step3Employee
          serviceId={state.service.id}
          onSelect={(e) => dispatch({ type: 'SET_EMPLOYEE', payload: e })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 4 && state.employee && state.service && (
        <Step4DateTime
          employeeId={state.employee.id}
          serviceId={state.service.id}
          onSelect={(date, time) => dispatch({ type: 'SET_DATETIME', payload: { date, time } })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
      {state.step === 5 && state.service && state.employee && state.date && state.time && (
        <Step5PersonalData
          service={state.service}
          employee={state.employee}
          date={state.date}
          time={state.time}
          onSuccess={(appt) => dispatch({ type: 'SET_APPOINTMENT', payload: appt })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      )}
    </div>
  );
}
