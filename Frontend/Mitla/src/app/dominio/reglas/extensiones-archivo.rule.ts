const EXTENSIONES_PERMITIDAS = ['md'];

export function extensionPermitida(nombreArchivo: string): boolean {
  const extension = nombreArchivo.split('.').pop()?.toLowerCase();

  if (!extension) {
    return false;
  }

  return EXTENSIONES_PERMITIDAS.includes(extension);
}