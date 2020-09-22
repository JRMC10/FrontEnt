export interface TarjetaCredito{
    id?: number;
    titular: string;
    numeroTarjeta: string;
    fechaExpiracion: string;
    cvv: string;
}

export class TarjetaCredito{
    id?: number;
    titular: string;
    numeroTarjeta: string;
    fechaExpiracion: string;
    cvv: string;
}
