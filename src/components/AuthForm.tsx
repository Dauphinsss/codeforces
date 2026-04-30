import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isRegister = mode === 'register';

  const handleError = submitted && handle.trim().length < 3;
  const passwordError = submitted && password.length < 8;
  const emailError = submitted && isRegister && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasError = handleError || passwordError || emailError;

  const errorBorder = (err: boolean) => err ? { borderColor: 'var(--color-danger)' } : undefined;

  return (
    <form
      className="panel-elevated grid gap-4 p-6"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <h2 className="text-2xl">{isRegister ? 'Crear cuenta' : 'Entrar'}</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
          Handle: tu nombre de usuario publico, ej: tourist, jiangly.
        </p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="auth-handle" className="text-sm font-bold">Handle</label>
        <input
          id="auth-handle"
          className="input-base"
          style={errorBorder(handleError)}
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          aria-invalid={handleError}
          aria-describedby={handleError ? 'handle-error' : 'handle-help'}
          autoComplete="username"
        />
        <p id="handle-help" className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Entre 3 y 24 caracteres. Sera visible en rankings y envios.
        </p>
        {handleError && (
          <p id="handle-error" role="alert" className="flex items-start gap-1.5 text-sm" style={{ color: 'var(--color-danger)' }}>
            <AlertCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
            El handle es demasiado corto. Escribi al menos 3 caracteres, por ejemplo accessiblecoder.
          </p>
        )}
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="auth-password" className="text-sm font-bold">Contrasena</label>
        <input
          id="auth-password"
          className="input-base"
          style={errorBorder(passwordError)}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          aria-invalid={passwordError}
          aria-describedby={passwordError ? 'password-error' : 'password-help'}
        />
        <p id="password-help" className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Minimo 8 caracteres. Combina letras y numeros para mayor seguridad.
        </p>
        {passwordError && (
          <p id="password-error" role="alert" className="flex items-start gap-1.5 text-sm" style={{ color: 'var(--color-danger)' }}>
            <AlertCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
            La contrasena tiene menos de 8 caracteres. Agregale al menos {Math.max(0, 8 - password.length)} mas para continuar.
          </p>
        )}
      </div>

      {isRegister && (
        <div className="grid gap-1.5">
          <label htmlFor="auth-email" className="text-sm font-bold">Correo electronico</label>
          <input
            id="auth-email"
            className="input-base"
            style={errorBorder(emailError)}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            aria-invalid={emailError}
            aria-describedby={emailError ? 'email-error' : 'email-help'}
          />
          <p id="email-help" className="text-xs" style={{ color: 'var(--color-muted)' }}>
            Ejemplo: nombre@dominio.com. Lo usamos para recuperar la cuenta.
          </p>
          {emailError && (
            <p id="email-error" role="alert" className="flex items-start gap-1.5 text-sm" style={{ color: 'var(--color-danger)' }}>
              <AlertCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
              El correo no parece valido. Asegurate de incluir un @ y un dominio, por ejemplo nombre@dominio.com.
            </p>
          )}
        </div>
      )}

      <button className="btn btn-primary mt-2" type="submit">
        {isRegister ? 'Registrarme' : 'Entrar'}
      </button>

      {submitted && !hasError && (
        <p
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-md border p-3 text-sm font-semibold"
          style={{
            color: 'var(--color-success)',
            background: 'var(--color-success-soft)',
            borderColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
          }}
        >
          <CheckCircle2 aria-hidden="true" size={18} />
          Datos validados. En esta demo no se envia informacion a un servidor.
        </p>
      )}
    </form>
  );
}
