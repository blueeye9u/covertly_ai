import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import Image from "next/image";
import { PDFDownloadIcon, RightArrow } from "../../svgs/svg";
import { Button } from "../global/button/Button";
import UserDropDown from "../global/userDropdown/UserDropdown";
import { images } from "../../assets/images";
import Input from "../global/forms/Input";
import { FiSearch } from "react-icons/fi";
import { MultiSelect } from "../global/customSelect";
import { useTheme } from "../../context/themeContext";
import { useRouter } from "next/router";
import { downloadBlob } from "../../utils/downloadUtils";

const RedactionView = () => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [regex, setRegex] = useState("");
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [lastSearchedRegex, setLastSearchedRegex] = useState("");
  const [lastSearchedPatterns, setLastSearchedPatterns] = useState<string[]>(
    []
  );
  const [isAutoRedactionDone, setIsAutoRedactionDone] = useState(false);
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const patternOptions = [
    {
      label: "Password",
      value: String.raw`(?i)(password|passcode)\s*[:=]\s*\S+`,
    },
    {
      label: "Email",
      value: String.raw`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`,
    },
    {
      label: "Credit Card",
      value: String.raw`\b(?:\d[ -]*?){13,16}\b`,
    },
    { label: "Social Security Number (US)", value: String.raw`\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b`, },
    { label: "Phone Number (US)", value: String.raw`\b(?:\+?1[-\s]?)?(?:\(?\d{3}\)?[-\s]?)?\d{3}[-\s]?\d{4}\b` },
    { label: "Driver's License (US)", value: String.raw`\b[A-Z]{1,2}\d{6,8}\b|\b\d{8,9}\b` },
    { label: "Passport Number", value: String.raw`\b[A-Z]{1,2}\d{6,9}\b` },
    { label: "IP Address", value: String.raw`\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b` },
    { label: "MAC Address", value: String.raw`\b[0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}\b` },
    { label: "Bank Account Number", value: String.raw`\b\d{8,17}\b` },
    { label: "Routing Number (US)", value: String.raw`\b\d{9}\b` },
    { label: "Tax ID/EIN", value: String.raw`\b\d{2}[-.\s]?\d{7}\b` },
    { label: "Credit Card CVV", value: String.raw`\b\d{3,4}\b` },
    { label: "Date of Birth", value: String.raw`\b(?:0[1-9]|1[0-2])[/.-](?:0[1-9]|[12][0-9]|3[01])[/.-](?:19|20)\d{2}\b` },
    { label: "Zip Code (US)", value: String.raw`\b\d{5}(?:[-.\s]?\d{4})?\b` },
    { label: "VIN Number", value: String.raw`\b[A-HJ-NPR-Z0-9]{17}\b` },
    { label: "Bitcoin Address", value: String.raw`\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b|\bbc1[a-z0-9]{39,59}\b` },
    { label: "IBAN", value: String.raw`\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b` },
    { label: "Medical Record Number", value: String.raw`\bMRN[:\s]?\d{6,10}\b|\b\d{6,10}\b` },
    { label: "Insurance Policy Number", value: String.raw`\b[A-Z]{2,3}\d{6,12}\b|\b\d{8,15}\b` },
    { label: "UUID", value: String.raw`\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b` },
    { label: "API Key", value: String.raw`\b(?:api[_-]?key|access[_-]?token|secret[_-]?key)[\s=:]+['"]?[A-Za-z0-9+/=]{20,}['"]?\b` },
    { label: "JWT Token", value: String.raw`\beyJ[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]*\b` },
    { label: "URL", value: "\\bhttps?://[^\\s<>\"{}|\\\\^`\\[\\]]+\\b" },
    { label: "Username", value: String.raw`\b(?:user|username|login)[\s=:]+['"]?[A-Za-z0-9._-]{3,30}['"]?\b` }
  ];

  // Extract document loaded handler
  const handleDocumentLoaded = (instance: any) => {
    instance.UI.setToolbarGroup("toolbarGroup-Redact");
    instance.UI.setToolMode("AnnotationCreateRedaction");
    instance.UI.openElements(["redactionPanel"]);
  };

  // Extract annotation change handler
  const handleAnnotationChanged = (annotations: any, action: string) => {
    if (action === "delete") {
      console.log("Redaction annotation deleted:", annotations);
    }
  };

  // Extract WebViewer configuration
  const configureWebViewerInstance = (instance: any) => {
    instanceRef.current = instance;
    const { documentViewer, annotationManager } = instance.Core;
    const { UI } = instance;
    
    documentViewer.addEventListener("documentLoaded", () => handleDocumentLoaded(instance));
    annotationManager.addEventListener("annotationChanged", handleAnnotationChanged);

    // Disable unnecessary UI elements
    instance.UI.disableElements([
      "toolbarGroup-View",
      "toolbarGroup-Annotate",
      "toolbarGroup-Edit",
      "toolbarGroup-Shapes",
      "toolbarGroup-Insert",
      "toolbarGroup-Forms",
      "toolbarGroup-Measure",
      "downloadButton",
      "searchPanelToggle",
      "notesPanelToggle",
      "redactionSearchOverlay",
      "datePickerToolButton",
      "calendarToolButton",
    ]);

    // Enable redaction features
    instance.UI.enableFeatures([instance.UI.Feature.Redaction]);
    instance.UI.enableElements([
      "redactionPanel",
      "redactionPanelButton",
      "redactionApplyButton",
      "redactionDeleteButton",
      "redactionClearButton"
    ]);

    // Set theme
    UI.setTheme(isDarkMode ? "dark" : "light");
  };

  // Extract WebViewer initialization
  const initializeWebViewer = () => {
    if (
      globalThis.window !== undefined &&
      viewerRef.current &&
      viewerRef.current.children.length === 0
    ) {
      const config = {
        path: "/webviewer",
        initialDoc: "https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf",
        fullAPI: true,
        enableRedaction: true,
        css: "apryseStyle.css",
      };
      
      WebViewer(config, viewerRef.current).then(configureWebViewerInstance);
    }
  };

  useEffect(() => {
    initializeWebViewer();
    return () => {
      instanceRef.current?.UI?.dispose?.();
    };
  }, []);

  const resetSearchHistory = () => {
    setLastSearchedRegex("");
    setLastSearchedPatterns([]);
    setIsAutoRedactionDone(false);
    setSelectedPatterns([])
  };

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && instanceRef.current) {
      instanceRef.current.UI.loadDocument(file);
      // Reset search history when new document is loaded
      resetSearchHistory();
    }
  };

  // Create redaction annotation for search results
  const createRedactionAnnotation = (
    pageNum: number,
    quads: any[],
    resultStr: string,
    regexPattern: string,
    patternLabel: string,
    annotationManager: any,
    Annotations: any
  ) => {
    const redactAnnotation = new Annotations.RedactionAnnotation({
      PageNumber: pageNum,
      Quads: quads.map((quad: any) => quad.getPoints()),
      StrokeColor: new Annotations.Color(255, 0, 0),
      StrokeThickness: 2,
      Author: annotationManager.getCurrentUser() || patternLabel,
      Subject: patternLabel,
      Contents: `${patternLabel}: "${resultStr || regexPattern}"`,
    });
    
    redactAnnotation.Manager = annotationManager;
    annotationManager.addAnnotation(redactAnnotation);
    annotationManager.selectAnnotation(redactAnnotation);
  };

  // Clear existing redactions for a specific pattern
  const clearExistingPatternRedactions = (
    regexPattern: string,
    patternLabel: string,
    annotationManager: any,
    Annotations: any
  ) => {
    const existingAnnotations = annotationManager.getAnnotationsList();
    const existingRedactions = existingAnnotations.filter(
      (annotation: any) =>
        annotation instanceof Annotations.RedactionAnnotation &&
        (annotation.Author === patternLabel || annotation.Subject === patternLabel) &&
        (annotation.Contents?.includes(regexPattern) || annotation.Contents?.includes(patternLabel))
    );

    if (existingRedactions.length > 0) {
      annotationManager.deleteAnnotations(existingRedactions);
    }
  };

  // Handle search result processing
  const handleSearchResult = (
    result: any,
    regexPattern: string,
    patternLabel: string,
    annotationManager: any,
    Annotations: any,
    Search: any
  ) => {
    if (result.resultCode === Search.ResultCode.FOUND) {
      const { pageNum, quads, resultStr } = result;
      createRedactionAnnotation(
        pageNum,
        quads,
        resultStr,
        regexPattern,
        patternLabel,
        annotationManager,
        Annotations
      );
    }
  };

  // Modified handleSearch to accept a callback for sequential processing
  const handleSearchWithCallback = (regexPattern: string, onDone: () => void) => {
    const { documentViewer, Search, Annotations, annotationManager } = instanceRef.current.Core;
    const patternInfo = patternOptions.find((p) => p.value === regexPattern);
    const patternLabel = patternInfo ? patternInfo.label : regexPattern;
    const modes = [Search.Mode.PAGE_STOP, Search.Mode.HIGHLIGHT, Search.Mode.REGEX];

    clearExistingPatternRedactions(regexPattern, patternLabel, annotationManager, Annotations);

    const searchOptions = {
      fullSearch: true,
      onDocumentEnd: onDone,
      onResult: (result: any) => handleSearchResult(
        result, 
        regexPattern, 
        patternLabel, 
        annotationManager, 
        Annotations, 
        Search
      ),
    };

    documentViewer.textSearchInit(regexPattern, modes, searchOptions);
  };

  const handleRegexSearch = () => {
    if (!regex.trim()) {
      alert("Please enter text or regex pattern to search");
      return;
    }

    if (regex === lastSearchedRegex) {
      return;
    }

    handleSearchWithCallback(regex, () => {});
    setLastSearchedRegex(regex);
  };

  // Remove redactions for patterns that are no longer selected
  const removeDeselectedPatternRedactions = (patternsToRemove: string[], annotationManager: any, Annotations: any) => {
    const existingAnnotations = annotationManager.getAnnotationsList();
    const labelsToRemove = patternsToRemove.map(
      (pattern) => (patternOptions.find((p) => p.value === pattern)?.label) || pattern
    );
    
    const redactionsToRemove = existingAnnotations.filter((annotation: any) => {
      if (!(annotation instanceof Annotations.RedactionAnnotation)) return false;
      return labelsToRemove.some(label =>
        annotation.Subject === label ||
        annotation.Author === label ||
        (typeof annotation.Contents === "string" && annotation.Contents.includes(label))
      );
    });
    
    if (redactionsToRemove.length > 0) {
      annotationManager.deleteAnnotations(redactionsToRemove, true);
      instanceRef.current.Core.documentViewer.refreshAll();
    }
  };

  // Process patterns sequentially for pattern search
  const processPatternSearchSequentially = (patternsToSearch: string[]) => {
    let currentPatternIndex = 0;

    const processNextPattern = () => {
      if (currentPatternIndex >= patternsToSearch.length) {
        setLastSearchedPatterns(selectedPatterns);
        return;
      }

      const patternValue = patternsToSearch[currentPatternIndex];
      currentPatternIndex++;
      handleSearchWithCallback(patternValue, processNextPattern);
    };

    processNextPattern();
  };

  const handlePatternSearch = () => {
    if (selectedPatterns.length === 0) {
      alert("Please select at least one pattern to search");
      return;
    }

    const { Annotations, annotationManager } = instanceRef.current.Core;

    // Remove redactions for deselected patterns
    const patternsToRemove = lastSearchedPatterns.filter(
      (pattern) => !selectedPatterns.includes(pattern)
    );
    
    if (patternsToRemove.length > 0) {
      removeDeselectedPatternRedactions(patternsToRemove, annotationManager, Annotations);
    }

    // Find new patterns to search
    const patternsToSearch = selectedPatterns.filter(
      (pattern) => !lastSearchedPatterns.includes(pattern)
    );

    if (patternsToSearch.length === 0) {
      setLastSearchedPatterns(selectedPatterns);
      return;
    }

    processPatternSearchSequentially(patternsToSearch);
  };

  // Extract auto-detected annotation labels for filtering
  const getAutoDetectedLabels = () => [
    "Email Address", "Credit Card", "Password", "Social Security Number (US)", 
    "Phone Number (US)", "Driver's License (US)", "Passport Number", "IP Address", 
    "MAC Address", "Bank Account Number", "Routing Number (US)", "Tax ID/EIN", 
    "Credit Card CVV", "Date of Birth", "Zip Code (US)", "VIN Number", 
    "Bitcoin Address", "IBAN", "Medical Record Number", "Insurance Policy Number", 
    "UUID", "API Key", "JWT Token", "URL", "Username"
  ];

  // Extract redaction patterns data
  const getRedactionPatterns = () => [
    { pattern: String.raw`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`, label: "Email Address" },
    { pattern: String.raw`\b(?:\d[ -]*?){13,16}\b`, label: "Credit Card" },
    { pattern: String.raw`(password|passcode)\s*[:=]\s*\S+`, label: "Password" }, // use 'i' flag if case-insensitive
    { pattern: String.raw`\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b`, label: "Social Security Number (US)" },
    { pattern: String.raw`\b(?:\+?1[-\s]?)?(?:\(?\d{3}\)?[-\s]?)?\d{3}[-\s]?\d{4}\b`, label: "Phone Number (US)" },
    { pattern: String.raw`\b[A-Z]{1,2}\d{6,8}\b|\b\d{8,9}\b`, label: "Driver's License (US)" },
    { pattern: String.raw`\b[A-Z]{1,2}\d{6,9}\b`, label: "Passport Number" },
    { pattern: String.raw`\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b`, label: "IP Address" },
    { pattern: String.raw`\b[0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}[:-][0-9A-Fa-f]{2}\b`, label: "MAC Address" },
    { pattern: String.raw`\b\d{8,17}\b`, label: "Bank Account Number" },
    { pattern: String.raw`\b\d{9}\b`, label: "Routing Number (US)" },
    { pattern: String.raw`\b\d{2}[-.\s]?\d{7}\b`, label: "Tax ID/EIN" },
    { pattern: String.raw`\b\d{3,4}\b`, label: "Credit Card CVV" },
    { pattern: String.raw`\b(?:0[1-9]|1[0-2])[/.-](?:0[1-9]|[12][0-9]|3[01])[/.-](?:19|20)\d{2}\b`, label: "Date of Birth" },
    { pattern: String.raw`\b\d{5}(?:[-.\s]?\d{4})?\b`, label: "Zip Code (US)" },
    { pattern: String.raw`\b[A-HJ-NPR-Z0-9]{17}\b`, label: "VIN Number" },
    { pattern: String.raw`\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b|\bbc1[a-z0-9]{39,59}\b`, label: "Bitcoin Address" },
    { pattern: String.raw`\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b`, label: "IBAN" },
    { pattern: String.raw`\bMRN[:\s]?\d{6,10}\b|\b\d{6,10}\b`, label: "Medical Record Number" },
    { pattern: String.raw`\b[A-Z]{2,3}\d{6,12}\b|\b\d{8,15}\b`, label: "Insurance Policy Number" },
    { pattern: String.raw`\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b`, label: "UUID" },
    { pattern: String.raw`\b(?:api[_-]?key|access[_-]?token|secret[_-]?key)[\s=:]+['"]?[A-Za-z0-9+/=]{20,}['"]?\b`, label: "API Key" },
    { pattern: String.raw`\beyJ[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]+\.[A-Za-z0-9+/=]*\b`, label: "JWT Token" },
    { pattern: "\\bhttps?://[^\\s<>\"{}|\\\\^`\\[\\]]+\\b", label: "URL" },
    { pattern: String.raw`\b(?:user|username|login)[\s=:]+['"]?[A-Za-z0-9._-]{3,30}['"]?\b`, label: "Username" }
  ];

  // Clear existing auto-detected redactions
  const clearExistingAutoRedactions = (annotationManager: any, Annotations: any) => {
    const existingAnnotations = annotationManager.getAnnotationsList();
    const autoDetectedLabels = getAutoDetectedLabels();
    
    const autoRedactions = existingAnnotations.filter((annotation: any) =>
      annotation instanceof Annotations.RedactionAnnotation &&
      (annotation.Contents?.includes("Auto-detected:") ||
        autoDetectedLabels.includes(annotation.Author))
    );

    if (autoRedactions.length > 0) {
      annotationManager.deleteAnnotations(autoRedactions);
    }
  };

  // Create redaction annotation for found result
  const createAutoRedactionAnnotation = (
    result: any, 
    patternData: any, 
    annotationManager: any, 
    Annotations: any
  ) => {
    const { pageNum, quads, resultStr } = result;
    const resultSuffix = resultStr ? ` - "${resultStr}"` : "";
    const contents = `Auto-detected: ${patternData.label}${resultSuffix}`;

    const redactAnnotation = new Annotations.RedactionAnnotation({
      PageNumber: pageNum,
      Quads: quads.map((quad: any) => quad.getPoints()),
      StrokeColor: new Annotations.Color(255, 0, 0),
      StrokeThickness: 2,
      Author: annotationManager.getCurrentUser() || patternData.label,
      Subject: patternData.label,
      Contents: contents,
    });
    
    redactAnnotation.Manager = annotationManager;
    annotationManager.addAnnotation(redactAnnotation);
    annotationManager.selectAnnotation(redactAnnotation);
  };

  // Process single pattern for auto redaction
  const processAutoRedactionPattern = (
    patternData: any,
    onComplete: () => void,
    documentViewer: any,
    Search: any,
    modes: any[],
    annotationManager: any,
    Annotations: any
  ) => {
    const searchOptions = {
      fullSearch: true,
      onDocumentEnd: onComplete,
      onResult: (result: any) => {
        if (result.resultCode === Search.ResultCode.FOUND) {
          createAutoRedactionAnnotation(result, patternData, annotationManager, Annotations);
        }
      },
    };

    documentViewer.textSearchInit(patternData.pattern, modes, searchOptions);
  };

  const handleAutoRedaction = () => {
    if (isAutoRedactionDone) return;
    
    resetSearchHistory();

    const { documentViewer, Search, Annotations, annotationManager } = instanceRef.current.Core;
    const redactionPatterns = getRedactionPatterns();
    const modes = [Search.Mode.PAGE_STOP, Search.Mode.HIGHLIGHT, Search.Mode.REGEX];

    clearExistingAutoRedactions(annotationManager, Annotations);

    let currentPatternIndex = 0;

    const processNextPattern = () => {
      if (currentPatternIndex >= redactionPatterns.length) {
        setIsAutoRedactionDone(true);
        return;
      }

      const currentPatternData = redactionPatterns[currentPatternIndex];
      currentPatternIndex++;

      processAutoRedactionPattern(
        currentPatternData, 
        processNextPattern, 
        documentViewer, 
        Search, 
        modes, 
        annotationManager, 
        Annotations
      );
    };

    processNextPattern();
  };

  const handleDownload = async () => {
    if (!instanceRef.current) {
      console.error("WebViewer instance not available");
      return;
    }

    try {
      const { documentViewer, annotationManager } = instanceRef.current.Core;
      const doc = documentViewer.getDocument();

      if (!doc) {
        console.error("No document loaded");
        return;
      }

      // Export annotations as XFDF string
      const xfdfString = await annotationManager.exportAnnotations();

      // Get file data with annotations included
      const data = await doc.getFileData({
        // saves the document with annotations in it
        xfdfString,
      });

      // Create blob and trigger download
      const arr = new Uint8Array(data);
      const blob = new Blob([arr], { type: "application/pdf" });

      // Create download link and trigger download
      downloadBlob(blob, "redacted-document.pdf");
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  return (
    <div className="relative flex w-full grow flex-col md:overflow-hidden">
      <div className="bg- flex items-center justify-between  gap-4 bg-whiteSmoke px-6 py-4 dark:bg-blackRussian4">
        <div className="flex items-center gap-5">
          <Image
              src={
                isDarkMode
                    ? "/assets/images/dark-small-logo.svg"
                    : "/assets/images/light-small-logo.svg"
              }
              width={14}
              height={32}
              alt="logo"
          />
          <button
            className="flex cursor-pointer gap-2.5"
            onClick={() => router.push("/chat")}
          >
            <span className="dark:text-white">
              <RightArrow />
            </span>
            <p className="text-sm dark:text-white">Auto Redaction</p>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 dark:bg-[#22252D] dark:text-white">
            <IoMdAdd /> Add to Chat
          </button> */}
          <Button onClick={handleAutoRedaction}>Auto Redaction</Button>
          <UserDropDown
            imgUrl={images.profileImg}
            btnClass={"!w-11 !h-11"}
            imgClass={"!w-11 !h-11"}
          />
        </div>
      </div>
      <div className="relative flex h-full grow flex-col md:h-[calc(100vh-82px)] md:flex-row">
        {/* Sidebar for Redaction Controls */}
        <div className="top-0 z-10 h-full w-full shrink-0 bg-whiteSmoke p-4 dark:bg-blackRussian4 md:sticky md:w-64">
          <h2 className="mb-5 border-b border-stormGrey pb-3 text-lg font-semibold dark:border-blackRussian3 dark:text-white">
            Redaction
          </h2>

          <div className="border-valcun mb-5 flex w-full flex-col items-center rounded-xl border border-dashed bg-linkWater px-6 py-[18px] dark:border-[#35383F] dark:bg-[#1E2129]">
            <div className="mb-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-light dark:bg-[#35383F] dark:text-white">
              <PDFDownloadIcon />{" "}
            </div>
            <p className="mb-1.5 text-xs dark:text-white">Upload Document</p>
            <p className="dark:text-gray-400 mb-4 text-center text-xs">
              Supported Formats: PDF, Word, or image
            </p>

            {/* Hidden input */}
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={loadFile}
              className="hidden"
            />

            {/* Button triggers file input */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="btn btn-primary btn-md">Choose File</div>
            </label>
          </div>

          <p className="mb-4 text-base text-aluminium">
            Manually highlight text, click & drag, or use text to create
            redaction annotation.
          </p>

          {/* Regex Input */}

          <div className="mb-4">
            <p className="mb-2 text-sm dark:text-white">Search Text</p>
            <div className="relative">
              <Input
                label={"Search text or regex"}
                type="text"
                placeholder="Search text or regex"
                value={regex}
                onChange={(e: any) => setRegex(e.target.value)}
                name={""}
                className="!bg-light !pr-10 dark:!bg-[#1E2129]"
                onKeyDown={(e: any) => e.key === "Enter" && handleRegexSearch()}
              />
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleRegexSearch}
              >
                <FiSearch />
              </button>
            </div>
          </div>
          {/* Pattern Selection Dropdown */}
          <div className="mb-3">
            <label
              htmlFor="pattern-select"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Select Pattern
            </label>
            <MultiSelect
              selected={selectedPatterns}
              setSelected={setSelectedPatterns}
              options={patternOptions}
              placeholder="Select patterns"
            />
          </div>

          {/* Search Selected Patterns Button */}
          {selectedPatterns.length > 0 && (
            <div className="mb-4">
              <Button className="w-full" onClick={handlePatternSearch}>
                Search
              </Button>
            </div>
          )}

          {/* <p className="text-base text-[#88898B] mb-5">After preparing your document, use the download button to save a copy to your device.</p> */}
          <Button className="w-full" onClick={handleDownload}>
            Download
          </Button>
        </div>

        {/* PDF Viewer */}
        <div ref={viewerRef} className="h-full w-full grow" />
      </div>
    </div>
  );
};

export default RedactionView;
