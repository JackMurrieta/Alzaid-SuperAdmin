// ── ubicacion.data.ts ──
// Datos estáticos de México — sin llamadas API
// Estados y municipios principales por estado

export const ESTADOS_MEXICO: string[] = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'México',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
];

export const MUNICIPIOS_MEXICO: Record<string, string[]> = {
    Aguascalientes: [
        'Aguascalientes', 'Asientos', 'Calvillo', 'Cosío', 'El Llano',
        'Jesús María', 'Pabellón de Arteaga', 'Rincón de Romos',
        'San Francisco de los Romo', 'San José de Gracia', 'Tepezalá',
    ],
    'Baja California': [
        'Ensenada', 'Mexicali', 'Playas de Rosarito', 'Tecate', 'Tijuana',
    ],
    'Baja California Sur': [
        'Comondú', 'La Paz', 'Loreto', 'Los Cabos', 'Mulegé',
    ],
    Campeche: [
        'Calkiní', 'Campeche', 'Carmen', 'Champotón', 'Escárcega',
        'Hecelchakán', 'Hopelchén', 'Palizada', 'Tenabo',
        'Calakmul', 'Candelaria',
    ],
    Chiapas: [
        'Comitán de Domínguez', 'Ocosingo', 'San Cristóbal de las Casas',
        'Tapachula', 'Tonalá', 'Tuxtla Gutiérrez', 'Villaflores',
    ],
    Chihuahua: [
        'Chihuahua', 'Ciudad Juárez', 'Cuauhtémoc', 'Delicias',
        'Hidalgo del Parral', 'Nuevo Casas Grandes', 'Ojinaga',
    ],
    'Ciudad de México': [
        'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán',
        'Cuajimalpa de Morelos', 'Cuauhtémoc', 'Gustavo A. Madero',
        'Iztacalco', 'Iztapalapa', 'La Magdalena Contreras',
        'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac', 'Tlalpan',
        'Venustiano Carranza', 'Xochimilco',
    ],
    Coahuila: [
        'Acuña', 'Monclova', 'Múzquiz', 'Piedras Negras',
        'Ramos Arizpe', 'Saltillo', 'Torreón',
    ],
    Colima: [
        'Armería', 'Colima', 'Comala', 'Coquimatlán', 'Cuauhtémoc',
        'Ixtlahuacán', 'Manzanillo', 'Minatitlán', 'Tecomán',
        'Villa de Álvarez',
    ],
    Durango: [
        'Canatlán', 'Durango', 'El Salto', 'Gómez Palacio',
        'Lerdo', 'Pueblo Nuevo', 'Santiago Papasquiaro',
    ],
    Guanajuato: [
        'Celaya', 'Guanajuato', 'Irapuato', 'León', 'Pénjamo',
        'Salamanca', 'Silao de la Victoria', 'San Miguel de Allende',
    ],
    Guerrero: [
        'Acapulco de Juárez', 'Chilpancingo de los Bravo',
        'Iguala de la Independencia', 'Taxco de Alarcón', 'Zihuatanejo de Azueta',
    ],
    Hidalgo: [
        'Actopan', 'Huejutla de Reyes', 'Ixmiquilpan', 'Mineral del Monte',
        'Pachuca de Soto', 'Tizayuca', 'Tula de Allende', 'Tulancingo de Bravo',
    ],
    Jalisco: [
        'El Salto', 'Guadalajara', 'Lagos de Moreno', 'Ocotlán',
        'Puerto Vallarta', 'Tepatitlán de Morelos', 'Tlaquepaque',
        'Tlajomulco de Zúñiga', 'Tonalá', 'Zapopan', 'Zapotlán el Grande',
    ],
    México: [
        'Atizapán de Zaragoza', 'Chalco', 'Chimalhuacán', 'Ecatepec de Morelos',
        'Ixtapaluca', 'Naucalpan de Juárez', 'Nezahualcóyotl', 'Nicolás Romero',
        'Tecámac', 'Texcoco', 'Tlalnepantla de Baz', 'Toluca', 'Tultitlán',
    ],
    Michoacán: [
        'Apatzingán', 'Hidalgo', 'La Piedad', 'Lázaro Cárdenas',
        'Morelia', 'Uruapan', 'Zamora', 'Zitácuaro',
    ],
    Morelos: [
        'Ayala', 'Cuernavaca', 'Cuautla', 'Jiutepec',
        'Temixco', 'Yautepec de Zaragoza',
    ],
    Nayarit: [
        'Bahía de Banderas', 'Compostela', 'Ixtlán del Río',
        'Santiago Ixcuintla', 'Tepic', 'Tuxpan',
    ],
    'Nuevo León': [
        'Apodaca', 'Cadereyta Jiménez', 'Escobedo',
        'García', 'Guadalupe', 'Juárez', 'Monterrey',
        'Montemorelos', 'San Nicolás de los Garza', 'San Pedro Garza García',
        'Santa Catarina',
    ],
    Oaxaca: [
        'Huajuapan de León', 'Juchitán de Zaragoza', 'Oaxaca de Juárez',
        'Salina Cruz', 'San Juan Bautista Tuxtepec', 'Tuxtepec',
    ],
    Puebla: [
        'Atlixco', 'Cholula', 'Cuautlancingo', 'Izúcar de Matamoros',
        'Puebla', 'San Andrés Cholula', 'San Martín Texmelucan',
        'Tehuacán', 'Teziutlán',
    ],
    Querétaro: [
        'Cadereyta de Montes', 'Corregidora', 'El Marqués',
        'Querétaro', 'San Juan del Río', 'Tequisquiapan',
    ],
    'Quintana Roo': [
        'Bacalar', 'Benito Juárez', 'Cozumel', 'Felipe Carrillo Puerto',
        'Isla Mujeres', 'José María Morelos', 'Lázaro Cárdenas',
        'Othón P. Blanco', 'Puerto Morelos', 'Solidaridad', 'Tulum',
    ],
    'San Luis Potosí': [
        'Aquismón', 'Cd. Valles', 'Matehuala', 'Rioverde',
        'San Luis Potosí', 'Soledad de Graciano Sánchez',
    ],
    Sinaloa: [
        'Ahome', 'Culiacán', 'Guasave', 'Mazatlán',
        'Navolato', 'Salvador Alvarado',
    ],
    Sonora: [
        'Agua Prieta', 'Álamos', 'Caborca', 'Cajeme',
        'Ciudad Obregón', 'Empalme', 'Guaymas', 'Hermosillo',
        'Huatabampo', 'Navojoa', 'Nogales', 'Puerto Peñasco',
        'San Luis Río Colorado',
    ],
    Tabasco: [
        'Cárdenas', 'Centro', 'Comalcalco', 'Huimanguillo',
        'Macuspana', 'Paraíso', 'Villahermosa',
    ],
    Tamaulipas: [
        'Altamira', 'Ciudad Madero', 'Ciudad Victoria', 'Matamoros',
        'Nuevo Laredo', 'Reynosa', 'Tampico',
    ],
    Tlaxcala: [
        'Apizaco', 'Chiautempan', 'Huamantla',
        'Tlaxcala', 'Tlaxco', 'Xaloztoc',
    ],
    Veracruz: [
        'Boca del Río', 'Coatzacoalcos', 'Córdoba', 'Minatitlán',
        'Orizaba', 'Papantla', 'Poza Rica de Hidalgo',
        'Tuxpan', 'Veracruz', 'Xalapa',
    ],
    Yucatán: [
        'Kanasín', 'Mérida', 'Progreso', 'Tekax',
        'Ticul', 'Tizimín', 'Umán', 'Valladolid',
    ],
    Zacatecas: [
        'Calera', 'Fresnillo', 'Guadalupe', 'Jerez de García Salinas',
        'Loreto', 'Río Grande', 'Zacatecas',
    ],
};