import React, { Fragment } from 'react';

export default [
    {
        title: '1. Karty graficzne - podział',
        content:
            <Fragment>
                <b>1. Bufory ramki</b> - służą jedynie do wyświetlania obrazu na ekranie monitora<br />
                <b>2. Akceleratory  grafiki płaskiej</b> - wspomagające CPU przy operacjach typu: wyświetlanie wielokątów i lini prostych, wypełnianiu wielokątków przesuwaniu i skalowaniu okien, itp.<br />
                <b>3. Akceleratory grafiki trójwymiarowej</b> - Odciążają jednostkę centralną w końcowym procesie obliczeń. W przypadku tych urządzeń w dalszym ciągu wstępne przygotowanie sceny 3D spoczywa na CPU, a szybkość realizacji tego zadania zależy od algorytmów zastosowanych przez programistę.<br />
                <b>4. Procesory graficzne</b> - posiadają układy wspomagające operacje geometryczne działają przy minimalnym zaangażowaniu jednostki centralnej komputera w proces tworzenia grafiki, określa się je również mianem akceleratorów geometrii.<br />
            </Fragment>
    }, {
        title: '2. Etapy generowania grafiki 3D',
        content:
            <Fragment>
                Niezależnie od konstrukcji karty graficznej najważniejszym zadaniem, jakie musi wykonać komputer przy tworzeniu trójwymiarowej grafiki jest przedstawienie jej na płaskim ekranie monitora. Cały proces tworzenia obrazu od chwili otrzymania danych z programu do momentu wyświetlenia grafiki na ekranie monitora nazywany jest często przetwarzaniem strumienia grafiki trójwymiarowej.<br/>
                W strumieniu tym wyróżnić można dwa zasadnicze etapy obliczeń:<br />
                - przekształcenia geometryczne<br />
                - rendering oraz rasteryzacja sceny.
            </Fragment>
    }, {
        title: '3. Na czym polega ustawianie geometrii',
        content:
            <Fragment>
                <b>a) Triangularyzacja</b> - Program generujący obraz 3D poprzez odpowiedni interfejs OpenGL czy Direct3D wysyła współrzędne wszystkich wierzchołków sceny do tzw. układu ustawiania trójkątów. Jest to specjalna jednostka, będąca częścią chipu graficznego. Grupuje ona wszystkie trójki wierzchołków w trójkąty. Każda trójka współrzędnych punktów powinna być zapamiętana w oddzielnym wektorze. Jako że praktycznie każdy wierzchołek należy nie do jednego, a do dwóch lub nawet więcej trójkątów stosuje się więc pewne techniki, które mają zmniejszyć rozmiar macierzy opisujących współrzędne wierzchołków opierają się one na tworzeniu tzw. pasów (strips) i wachlarzy (fans).<br/>
                <b>b) Ustawianie geometrii bryły widzenia</b> - Rozpoczynając generowanie trójwymiarowej sceny niezbędne jest utworzenie „mapy” opisującej położenie wszystkich występujących na niej obiektów. Następnie wszystkie obecne na ekranie bryły należy poddać trzem operacjom transformacji geometrycznych:<br/>
                - Skalowaniu<br/>
                - Translacji<br/>
                - Rotacji<br/>
                ustawia to obiekty w odpowiednim położeniu oraz we właściwej skali.<br/>
                <b>c) Wycinanie i zakrywanie linii niewidocznych.</b>
            </Fragment>
    }, {
        title: '4. Co to jest rendering i jego podział',
        content:
            <Fragment>
                Na złożone z trójkątów szkieletowe bryły akcelerator: nakłada wypełnienie pustych przestrzeni wewnątrz wielokątów oraz symuluje światła padające na wielokąty. Rendering można podzielić na trzy główne procesy: <br/>
                <b>a) Teksturowanie</b> <br/>
                <b>b) Oświetlenie i cieniowanie</b> <br/>
                <b>c) Dodawanie efektów specjalnych</b>
            </Fragment>
    }, {
        title: '5. Co to jest teksturowanie',
        content:
            <Fragment>
                Najważniejszy i najbardziej skomplikowany etap renderingu. Zabieg ten polega na nakładaniu na trójwymiarowy szkielet płaskich obrazków nazywanych teksturami mających imitować spotykane w realnym świecie powierzchnie. <br/>
                Cały proces mapowania (nakładania) tekstur sprowadza się do odpowiedniego owijania brył teksturami. Problem polega na tym, iż wszystkie elementy trójwymiarowej sceny składają się z trójkątów o różnych rozmiarach. Tekstury należy więc dopasować do wielkości odpowiadającej poszczególnych trójkątów. Proces ten nazywa się wycinaniem (ang. clipping) <br/>
                Wycinanie (clipping) Polega na wyodrębnieniu trójkąta o żądanej wielkości z kwadratowej zazwyczaj tekstury. W tym celu określane są współrzędne trzech punktów na teksturze, a następnie przyporządkowuje się je stosownym wierzchołkom teksturowanego trójkąta.
            </Fragment>
    }, {
        title: '6. MIP - mapping',
        content:
            <Fragment>    
                Z pierwotnych tekstur, które mają ściśle określony rozmiar, np. 8×8 lub 64×64 piksele, prawie nigdy nie da się wyciąć odpowiedniego pod względem rozmiarów trójkąta do mapowanej przestrzeni. Mając to na uwadze oraz aby zapobiec ciągłemu przeskalowywaniu tekstur opracowano mechanizm MIP mappingu (Multum in Parvo - wiele w niewielu). Przed renderowaniem sceny z każdej tekstury tworzonych jest kilka (zazwyczaj osiem) tzw. map MIP. Mapy MIP to nic innego jak zmniejszone bitmapy utworzone na podstawie tekstury wzorcowej. Każda kolejna mapa MIP jest czterokrotnie mniejsza od poprzedniej. Jeśli pierwsza miała rozmiar 256×256 pikseli, to następna będzie miała wielkość 128×128 punktów, kolejna 64×64 itd. Przy nakładaniu na trójkąt tekstury do wycinania wybierana jest jedna lub dwie sąsiednie ze zbioru map MIP. Do poteksturowania obiektu trójwymiarowego używa się tej tekstury, której rozdzielczość jest wystarczająca do reprezentowania obiektu obserwowanego z pewnej odległości. Właśnie od odległości zależy, która mipmapa zostanie wybrana. Im obiekt znajduje się dalej od obserwatora, tym mniejszą zajmuje powierzchnię i tym mniejsza tekstura jest potrzebna. Mipmapping jest implementowany sprzętowo w kartach grafiki.<br/>
                <b>Zalety mipmappingu:</b><br/>
                Wstępne usuwanie zakłóceń skalowanych tekstur, co ma istotne znaczenie w grafice czasu rzeczywistego (gry komputerowe, symulatory lotu).<br/>
                Zwiększenie prędkości teksturowania, ponieważ przetwarzana jest o wiele mniejsza liczba pikseli tekstury.<br/>
                <b>Wady:</b><br/>
                Zwiększenie wymagań pamięciowych o 1/3.<br/>
            </Fragment>
    }, {
        title: '7. Próbkowanie punktowe',
        content:
            <Fragment>
                Zastosowanie MIP mappingu nie rozwiązuje w pełni problemu dokładnego dopasowania tekstur do wielkości trójkątów. Dlatego bardzo często przy teksturowaniu, pojedyncze teksele, czyli najmniejsze elementy (punkty) tekstury, powielane są w różnych miejscach wielokąta.<br/>
                Technika przyporządkowania każdemu pikselowi trójkąta tylko jednego teksela tekstury i w razie potrzeby kilkukrotnego powielenia punktów nosi nazwę próbkowania punktowego (ang. point sampling texturing).<br/>
                Wadą tego sposobu jest to, że powielenie jednego punktu do kilku objawia się efektem potocznie nazywanym pikselozą – widoczne stają się kolorowe piksele. Jest to szczególnie wyraźne wtedy, gdy tekstura musi pokryć obszar znacząco większy niż ona sama. Aby uniknąć powyższego efektu korzysta się z tzw. filtrowania tekstur.kątów. Dlatego bardzo często przy teksturowaniu, pojedyncze teksele, czyli najmniejsze elementy (punkty) tekstury, powielane są w różnych miejscach wielokąta.<br/>
            </Fragment>
    }, {
        title: '8. Filtrowanie tekstur',
        content:
            <Fragment>
                <b>a) filtrowanie dwuliniowe</b> - Polega na przyporządkowaniu każdemu punktowi teksturowanego trójkąta barwy otrzymanej w wyniku interpolacji czterech sąsiednich tekseli tekstury.<br/>
                <b>b) filtrowanie trójliniowe</b> - Do ujednolicania barwy zamiast sąsiednich tekseli stosuje się dwie kolejne mapy MIP. Najpierw poddaje się interpolacji dwuliniowej mapę bezpośrednio mniejszą następnie bezpośrednio większą np. jeśli trójkąt wymaga wycinania z mapy o rozdzielczości 100 tekseli, to brane są pod uwagę mapy 64x64 i 128x128. Dopiero uśredniony wynik obu tych operacji (w sumie interpolujemy wartość ośmiu tekseli) nakłada się na mapowany trójkąt.<br/>
                <b>c) filtrowanie anizotropowe</b> - Wymaga największej mocy obliczeniowej. Bierze pod uwagę orientację przestrzenną tekseli względem obserwatora. Dzięki temu obszary, z których interpolowane są brakujące wartości, układają się w kształt elipsy, prostokąta lub rombu (długa oś wyznacza kierunek obserwacji). Filtrowanie anizotropowe umożliwia zatem zachowanie oryginalnego kształtu tekstur również na obiektach znajdujących się pod pewnym kątem w stosunku do obserwatora.
            </Fragment>
    }, {
        title: '9. Korekcja perspektywy',
        content:
            <Fragment>
                Podczas odwzorowania często występują problemy z zachowaniem odpowiedniej perspektywy. Dotyczy to: dużych trójkątów z nałożonymi teksturami (np. ściany, sufity lub podłogi) lub znajdujących się niemal prostopadle do płaszczyzny ekranu. Elementy sceny rozjeżdżają się, dając dziwne powykrzywiane wzory spowodowane załamywaniem się tekstur lub ich znikaniem (np. w scenach z długim tunelem). Błąd ten wynika ze złej metody uwzględnienia położenia wielokąta w przestrzeni.<br/>
                W celu wyeliminowania tych niepożądanych efektów stosuje się algorytmy korekcji perspektywy (ang. perspective correction). Metoda ta polega na:<br/>
                a) Stworzeniu wirtualnego punktu w nieskończoności.<br/>
                b) Następnie każda linia poprowadzona z dowolnego miejsca obrazu musi zbiec się w owym punkcie.<br/>
                c) Dopiero wówczas akcelerator, zgodnie z zasadą rzutu perspektywicznego, nakłada tekstury już bez tych niechcianych deformacji.
            </Fragment>
    }, {
        title: '10. Mapowanie wybojów',
        content:
            <Fragment>
                Mapowanie wybojów powoduje złudzenie, że obiekt nie jest gładki, a chropowaty. Gdy na niego patrzymy zdaje nam się, że widzimy wyboje, rysy czy rowki. Z jednej strony wybój (wypukłość) będzie jasny, z drugiej ciemny. Należy pamiętać, że mapowanie wybojów to efekt manipulujący wyłącznie grą światła a nie wielokątami.<br/>
                Metody mapowania wybojów można podzielić na:<br/>
                <b>1. Mapowanie wypukłości (bump mapping)</b> - W metodzie tej dla każdej tekstury tworzone są tzw. mapy wybojów (ang. bump maps). Są one płaskimi bitmapami, podobnie jak zwykłe tekstury. Jasność poszczególnych pikseli określa położenie (wysokość) tekseli nad płaszczyzną tekstury. Mapa wybojów jest nakładana na pierwotną teksturę. Dzięki temu otrzymujemy dodatkową informację o usytuowaniu każdego teksela względem płaszczyzny tekstury.<br/>
                <b>2. Tłoczenie wybojów (emboss bump mapping)</b> - Sprawdza się ono dobrze wtedy, gdy na tekstury spoglądamy pod niewielkim kątem lub są one nakładane na poruszające się obiekty. Tłoczenie realizowane jest w trzech etapach:<br/>
                - W pierwszym z nich z mapy opisującej wygląd wypukłości (mapy wybojów) tworzone są dwa monochromatyczne obrazy. Jeden zostanie wykorzystany do przedstawienia obszarów jaśniejszych, a drugi będzie odpowiadał za fragmenty zacienione.<br/>
                - W drugiej fazie obie bitmapy przesuwane są o kilka pikseli względem siebie (jedna do tyłu, druga do przodu) wzdłuż kierunku padającego światła.<br/>
                - Ostatni z etapów polega na zlaniu rozsuniętych bitmap (przy wykorzystaniu omawianego w dalszej części prezentacji alpha-blendingu) z właściwą teksturą obiektu.<br/>
                <b>3. Środowiskowe mapowanie wybojów</b> - Najbardziej zaawansowany sposób bump mappingu polegający na użyciu trzech osobnych map: właściwej, wybojów oraz środowiska. Mapa wybojów (bump map) posiadająca zapisane informacje o wysokości każdego teksela nakładana jest na mapę środowiskową (environment map), która może myć mapą świateł lub inną mapą tekstury. Tak stworzona mapa nosi nazwę tzw. wichrowatej mapy środowiska (perturbed environment map) łączonej następnie z mapą właściwą (texture map) bazującą na oryginalnych kolorach tekstury. Środowiskowe mapowanie wybojów pozwala uzyskać wiele ciekawych efektów, takich jak falująca powierzchnia wody lub karoseria samochodu odbijająca otoczenie. Jest to aktualnie najpopularniejsza metoda bump mappingu.<br/>
                <b>4. DOT 3 mapping</b> - jedna z wielu technik symulowania wypukłości na płaskich wielokątach, stosowana w grafice trójwymiarowej. Jest rozwinięciem koncepcji mapowania wypukłości (ang. Bump Mapping) opracowanej przez Jamesa F. Blinna i opisanej w publikacji z 1978 roku[1]. Podstawą działania mapowania normalnych jest zastąpienie wektorów normalnych opisanych przez geometrię, wektorami zapisanymi w specjalnej teksturze - mapie normalnych. Istnieje wiele podobnych technik symulowania wypukłości, jednak odwzorowanie normalnych jest obok parallax occlusion mappingu najczęściej stosowaną techniką we współczesnych grach komputerowych. Głównie za sprawą niewielkiej złożoności obliczeniowej, wymaganej do uzyskania efektu. Mapowanie normalnych pozwala w bardzo efektywny sposób, uzyskać wizualne złudzenie większej złożoności modelu trójwymiarowego niż jest w rzeczywistości. Dzięki temu liczba wielokątów potrzebnych do opisania takiego modelu może być znacznie ograniczona.<br/>
                Często jest łączone z mapowaniem środowiska (Multiteksturowanie, Mapowanie trójwymiarowe)<br/>
                <b>1. Mapowanie środowiska</b> - W bardziej zaawansowanych metodach bump-mappingu dodatkowo wykorzystuje się tzw. mapy środowiska (ang. environmental maps). Mapowanie środowiskowe w połączeniu z bump-mappingiem pozwala otrzymać zaawansowane efekty, takie jak falująca powierzchnia wody, w której odbijają się nadbrzeżne drzewa. Uzyskanie takich rezultatów możliwe jest dzięki nałożeniu w jednym przebiegu trzech bitmap: podstawowej tekstury, mapy wypukłości oraz mapy środowiska. Mapa wybojów nakładana jest na mapę środowiska, w wyniku tego powstaje zaburzona mapa środowiska (ang. perturbed environment map), a następnie łączona jest ona z właściwą teksturą nakładaną na obiekt. Mapy środowiska zawierają w sobie informacje m.in. o refleksach na powierzchni przedmiotu od rozstawionych na generowanej scenie wielokolorowych: świateł lustrzanych, odbić i refleksów świetlnych, które pochodzą od innych przedmiotów otaczających obiekt. W procesie mapowania środowiskowego dzięki nałożeniu na pierwotną teksturę przedmiotu bitmapy środowiskowej uzyskuje się wszelkiego rodzaju efekty luster, szklanych drzwi, itp.<br/>
                <b>2. Multiteksturowanie</b> - Podczas teksturowania, w większości przypadków na jeden obiekt nakładanych jest kilka różnych bitmap. Im więcej mapowanych jest tekstur, tym potrzeba większej mocy obliczeniowej akceleratora. Szybkie chipy graficzne przeznaczone do użytku domowego umożliwiają mapowanie do kilkudziesięciu gigatekseli w ciągu jednej sekundy. Tę podaną wartość nazywa się współczynnikiem fillrate i określa ona teoretyczną szybkość procesu wypełniania wielokątów przez procesor graficzny.<br/>
                <b>3. Mapowanie trójwymiarowe</b> - W pakiecie Microsoft DirectX począwszy od wersji 8.0 programiści uwzględnili obsługę całkiem nowego rodzaju tekstur, a mianowicie tekstur 3D Podobne funkcje zaimplementowano też już w bibliotekach OpenGL 1.2 Oczywiście techniki tekstur trójwymiarowych nie są niczym nowym, gdyż z obrazów tego typu, nazywanych często warstwowymi lub wolumetrycznymi, od dłuższego czasu korzystają lekarze wykonujący komputerową tomografię. Nowa technika oznacza przede wszystkim, iż tekstury przestają wyłącznie okrywać powierzchnię przedmiotów, ale wnikają wgłąb nich. W przypadku tekstur 3D proces obliczeniowy jest wyjątkowo prosty. Aby obejrzeć wnętrze bryły należy części tekseli (wokseli) nadać atrybut przezroczystości. Można wtedy zobaczyć wszystkie najdrobniejsze detale, gdyż budowa i faktura wnętrza zawarte są w mapie wolumetrycznej. Objętość trójwymiarowych tekstur jest jednak wyjątkowo duża. Np. 32-bitowa dwuwymiarowa tekstura o wymiarach 16×16 pikseli ma objętość 1024 bajtów. Po dodaniu trzeciego wymiaru (16×16×16 punktów) rozrasta się jednak do 16 384 bajtów! Tak znaczne pojemności przetwarzanych obiektów wymagają od systemu olbrzymiej przepustowości magistrali pamięci i stosowania algorytmów kompresji tekstur.
            </Fragment>
    }, {
        title: '11. Alpha-blending',
        content:
            <Fragment>
                Aby określić stopień przezroczystości tekstury wykorzystywany jest tzw. kanał alfa, a cała technika nazywana jest alpha-blendingiem. Kanał alfa jest parametrem określającym stopień przezroczystości nakładanej tekstury. Przyjmuje on wartości od zera (obiekt zupełnie transparentny) do 255 (powierzchnia nieprzezroczysta). Jeśli nałożona zostanie tekstura z kanałem alfa równym zero, nic się nie zmieni na rysunku, tekstura będzie niewidoczna.<br/>
                Jeżeli wartość kanału wynosi np. 128, wówczas obłożony nią obiekt będzie półprzezroczysty, a znajdujące się za nim przedmioty będą przezeń widoczne. Przy maksymalnej wartości mamy do czynienia z typową nieprzezroczystą teksturą. Wartość kanału alfa jest jednym z czterech parametrów opisujących teksturę.<br/>
                Praktycznie wszystkie nowoczesne akceleratory potrafią obsługiwać 32 bitowy kolor. Jak wiadomo do przedstawienia pełnej palety barw wystarczą 24 bity. Brakujące osiem bitów to właśnie kanał alfa, a tekstury takie nazywane są RGBA. Trzy kolory składowe oraz kanał alfa.<br/>
            </Fragment>
    }, {
        title: '12. Cieniowanie',
        content:
            <Fragment>
                Drugi etap generowania trójwymiarowego obrazu nazywa się cieniowaniem (ang. shading). Niektórzy używają tego pojęcia dla całości procesu, ale to dwa oddzielne typy algorytmów.<br/>
                Najważniejsze metody cieniowania to:<br/>
                <b>- Cieniowanie płaskie</b> - Polega ono na przyporządkowaniu całej powierzchni trójkąta jednego poziomu jasności. Dodatkowo uwzględnia barwy w przypadku gdy na scenie, rozstawione są kolorowe źródła światła. Poziom jasności i barwa są określane przez jeden z jego wierzchołków – zazwyczaj przez znajdujący się najbliżej obserwatora. Oznacza to, że każdemu trójkątowi przypisuje się jeden ściśle określony odcień, niezależnie od otaczających go wielokątów. Zakłada się wtedy również rozproszone odbicie światła. Niestety, rezultaty cieniowania płaskiego nie są zadowalające, gdyż szczególnie na okrągłych przedmiotach (np. kulach) uzyskuje się efekt kanciastości obiektów, wynikający z gwałtownych zmian jasności przylegających do siebie trójkątów.<br/>
                <b>- Cieniowanie interpolacyjne Gourauda</b> - zakłada, iż pojedynczy odcień wnętrza każdego trójkąta powstaje z interpolacji: kolorów świateł, natężenia światła występujących w każdym z jego wierzchołków. Przy okazji uwzględniona zostaje w pewnym zakresie jasność sąsiednich wielokątów. W metodzie tej wnętrzu trójkąta przypisuje się nie jeden, ale kilka różnych poziomów jasności. Otrzymane są one przez interpolację natężenia światła wzdłuż linii przechodzącej przez trójkąt i biegnącej od obserwatora do punktu w nieskończoności. Zakłada zwierciadlane odbicie światła. Wreszcie, każdy wielokąt jest cieniowany na zasadzie: interpolacji liniowej między wierzchołkami wzdłuż każdej krawędzi, a potem między krawędziami wzdłuż każdego przeglądanego wiersza w sposób przedstawiony równaniami z prawej strony rysunku. Określenie cieniowanie Gourauda jest często uogólniane na: cieniowanie metodą interpolacji jasności jednego wielokąta albo na interpolację dowolnych barw związanych z wierzchołkami wielokąta. W ten sposób zostają zachowane płynne przejścia poziomów jasności pomiędzy poszczególnymi wielokątami. Nie ma przylegających do siebie obszarów o drastycznie różnych poziomach natężenia światła. Co ciekawe, cieniowanie Gourauda wywołuje złudzenie gładkości sferycznych obiektów złożonych nawet z niewielkiej liczby trójkątów<br/>
                <b>- cieniowanie Phong’a</b> - nazywane też techniką per-pixel lighting. W metodzie tej kolor i natężenie światła przyporządkowywane są oddzielnie do każdego punktu sceny 3D - piksela obrazu. W metodzie tej interpolacji podlega wektor normalny do powierzchni na podstawie normalnych wektorów węzłowych. Jasność wewnątrz trójkąta może się zatem wyraźnie różnić od wartości węzłowych. Cieniowanie Phonga z krzywoliniową interpolacją kształtu obiektów - często w celu poprawienia wyglądu sceny stosuje się prymitywy krzywoliniowe – np. bikubiczne płaty powierzchni – metodę modelowania niektórych powierzchni.            </Fragment>
    }, {
        title: '13. Efekty specjalne',
        content:
            <Fragment>
                Ostatnim etapem renderingu sceny 3D jest dodanie efektów specjalnych(mgły, opary nad lustrem wody, falowanie rozgrzanego powietrza, mżawka, dym, ogień oraz zmętnienia lustra wody, itp.).<br/>
                Często wykorzystywanym efektem atmosferycznym jest mgła (ang. fog). Tworzy się ją za pomocą czterech różnych technik:<br/>
                <b>1. Mgła liniowa</b> - Stosowanie tej metody polega na liniowym zamgleniu obiektów wraz ze wzrostem ich odległości od obserwatora. Wykorzystuje się w tym przypadku funkcje liniowe.<br/>
                <b>2. Tablica mgieł</b> - Lepszą i częściej stosowaną metodą jest tzw. tablica mgieł (ang. table fog). W tym przypadku stopień zamglenia, zależny od odległości od obserwatora, zapisany jest w przygotowanej uprzednio tablicy. Ta metoda doskonale się sprawdza w przypadku tworzenia takich efektów, jak opary nad powierzchnią jeziora, nieciągłe smugi mgły nad bagnami itp. <br/>
                <b>3. Mgła wykładnicza</b> - W działaniu przypomina ona efekty uzyskiwane za pomocą tablicy mgieł. Jednak w tym przypadku nie wymaga się predefiniowania stopni zamglenia, które obliczane są na bieżąco na podstawie zaprogramowanej funkcji wykładniczej.<br/>
                <b>4. Mgła wolumetryczna</b> - wykorzystywane są półprzezroczyste tekstury trójwymiarowe. Mgła zbudowana jest z warstw o różnej gęstości, co pozwala na wyjątkowo realne odwzorowanie otaczającego nas świata.
            </Fragment>
    }
]